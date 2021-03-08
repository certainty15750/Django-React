from rest_framework import serializers
from task.models import Task, Answer


class TaskSerializer(serializers.ModelSerializer):
    # tasks = serializers.PrimaryKeyRelatedField(many=True, queryset=Task.objects.all())

    class Meta:
        model = Task
        fields = ('id', 'task_type', 'element_category', 'element_type', 'priority', 'voters',
                  'external_id', 'task_name', 'image_url', 'answers', 'black_list', 'white_list', 'is_active')

class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = ('id', 'user', 'task', 'value', 'skipped')
