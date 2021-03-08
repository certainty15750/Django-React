from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from task import views

urlpatterns = [
    path('list', views.TaskList.as_view()),
    path('create', views.CreateTask.as_view()),
    path('element_categories', views.ElementCategory.as_view()),
    path('answer', views.Answer.as_view()),
    path('enable', views.UpdateTaskStatus.as_view()),
    path('answerlist', views.TaskListByExternalId.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)