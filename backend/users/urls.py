from django.urls import path
from . import views

urlpatterns = [
    path('me', views.GetMeView.as_view()),
    path('list', views.UserListView.as_view()),
    path('create', views.CreateUser.as_view()),
    path('enable', views.UpdateUserStatus.as_view())
]
