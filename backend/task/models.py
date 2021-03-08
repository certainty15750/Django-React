from django.db import models
# from django.contrib.postgres.fields import ArrayField
from users.models import CustomUser


class Task(models.Model):
    task_type = models.CharField(max_length=400, blank=True, default='')
    element_category = models.CharField(max_length=400, blank=True, default='')
    element_type = models.CharField(max_length=400, blank=True, default='')
    priority = models.IntegerField(blank=True)
    voters = models.IntegerField(blank=True)
    external_id = models.CharField(max_length=500, blank=True, default='')
    task_name = models.CharField(max_length=400, blank=True, default='')
    image_url = models.CharField(max_length=400, blank=True, default='')
    answers = models.CharField(max_length=400, blank=True, default='')
    black_list = models.CharField(max_length=400, blank=True, default='')
    white_list = models.CharField(max_length=400, blank=True, default='')
    created = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    class Meta:
        db_table = 'tasks'


class Answer(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, null=True,  on_delete=models.CASCADE, related_name='answer')
    value = models.CharField(max_length=400, blank=True, default='')
    skipped = models.BooleanField(default=False)

    class Meta:
        db_table = 'answers'
