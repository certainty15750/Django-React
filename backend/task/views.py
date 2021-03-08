
from task.models import Task, Answer as Answering
from task.serializers import TaskSerializer, AnswerSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import AllowAny
from django.db import models
from django.db.models import  F
from users.models import CustomUser
from django.db.models import Q
from django.core import serializers
import json


class CreateTask(APIView):
    """
    create a new task.
    """
    def post(self, request, format=None):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ElementCategory(APIView):
    """
    list of element_category(not duplicated)
    """
    def get(self, request, format=None):
        element_categories = Task.objects.values_list('element_category')
        return Response(element_categories)


class Answer(APIView):
    """
    Saving answer.
    """
    def post(self, request, format=None):
        request_data = request.data
        current_user = CustomUser.objects.filter(email=request.user).get()
        try:
            task = Task.objects.filter(pk=request_data['task']).get()
        except Task.DoesNotExist:
            return Response({"error": "task not exist"}, status=status.HTTP_400_BAD_REQUEST)

        request_data['user'] = current_user.id
        check_answer = Answering.objects.filter(user=current_user, task=task).all()
        if len(check_answer) == 0:
            serializer = AnswerSerializer(data=request_data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "already answered"}, status=status.HTTP_400_BAD_REQUEST)



class TaskList(APIView):
    permission_classes = (AllowAny,)
    """
    list of element_category(not duplicated)
    """
    def get(self, request, format=None):
        num_per_page = 5
        page = request.GET.get('page')
        task_type = request.GET.get('task_type')
        element_category = request.GET.get('element_category')
        current_user = request.user
        email = request.user.email
        answered_tasks = Answering.objects.filter(user=current_user).values_list('task')
        answered_task_ids = []
        for answered_task in answered_tasks:
            answered_task_ids.append(answered_task[0])
        """
        get tasks filtered by 
            voters - if task is answered by user N times, if N is same with 'voters', this task should be excluded
            task_type - filter element
            element_cateogry - filter element
            black_list - if black_list involve current user email, this task should be excluded
            priority - order by priority
        """
        if element_category == "All":
            query = Task.objects \
                .annotate(counted_voters=models.Count('answer')) \
                .values('id', 'task_type', 'element_category', 'element_type', 'priority', 'voters', 'external_id',
                        'task_name', 'image_url', 'answers', 'black_list', 'white_list', 'counted_voters') \
                .filter(voters__gt=F('counted_voters'), task_type=task_type) \
                .filter(Q(white_list="") | (Q(white_list__isnull=False) & Q(white_list__contains=email))) \
                .exclude(black_list__contains=email) \
                .exclude(id__in=answered_task_ids) \
                .order_by('priority')
        else:
            query = Task.objects\
                .annotate(counted_voters=models.Count('answer')) \
                .values('id', 'task_type', 'element_category', 'element_type', 'priority', 'voters', 'external_id',
                        'task_name', 'image_url', 'answers', 'black_list', 'white_list', 'counted_voters') \
                .filter(voters__gt=F('counted_voters'), task_type=task_type, element_category=element_category) \
                .filter(Q(white_list="") | (Q(white_list__isnull=False) & Q(white_list__contains=email)))\
                .exclude(black_list__contains=email) \
                .exclude(id__in=answered_task_ids) \
                .order_by('priority')

        task_list = query.all()
        paginator = Paginator(task_list, num_per_page)

        try:
            tasks = paginator.page(page)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            tasks = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            return Response([])

        return Response(tasks.object_list)


class TaskListByExternalId(APIView):
    permission_classes = (AllowAny,)
    """
    list of element_category(not duplicated)
    """
    def get(self, request):
        pk = int(request.GET.get('pk'))

        try:
            task = Task.objects.filter(pk=pk).get()
        except Task.DoesNotExist:
            task = None
        if task:
            task_json = serializers.serialize("json", [task,])
            task_structure = json.loads(task_json)
            task_fields = task_structure[0]['fields']

            answers_json = serializers.serialize("json", Answering.objects.filter(task=task).all())
            answer_structure = json.loads(answers_json)
            answer_fields = []
            for answer in answer_structure:
                answer_fields.append(answer['fields'])

            response = {
                "pk": pk,
                "task": task_fields,
                "answers": answer_fields
            }
        else:
            response = {
                "pk": pk,
                "task": None,
                "answers": None
            }

        return Response(response)


class UpdateTaskStatus(APIView):
    """
    Enable/Disable task status.
    """
    def get_object(self, info):
        try:
            task = Task.objects.filter(pk=info['pk']).get()
        except Task.DoesNotExist:
            task = None
        if task:
            return task
        else:
            return None

    def put(self, request, format=None):
        task = self.get_object(request.data)
        if task:
            task.is_active = request.data['is_active']
            task.save()
            response = {'status': 0, 'message': 'success'}
            return Response(response)
        raise Response({}, status=status.HTTP_400_BAD_REQUEST)
