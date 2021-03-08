from django.contrib import admin
from .models import Task, Answer

class TaskAdmin(admin.ModelAdmin):
    model = Task
    list_display = ['task_type', 'element_category', 'white_list', 'black_list', 'is_active']


admin.site.register(Task, TaskAdmin)


class AnswerAdmin(admin.ModelAdmin):
    model = Answer
    list_display = ['task', 'user', 'value', 'skipped']


admin.site.register(Answer, AnswerAdmin)
