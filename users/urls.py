from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users import views


urlpatterns = [
    path('users/change_pass', views.UpdatePasswordView.as_view())
]
