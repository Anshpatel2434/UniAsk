from django.urls import path
from .views import *

urlpatterns = [
    path("student/students", StudentView.as_view()),
    path("student/addStudent", CreateStudentView.as_view()),
    path("student/signup", StudentSignupView.as_view()),
    path("student/signin", StudentSigninView.as_view()),
    path("student/getStudent", GetStudentView.as_view()),
]
