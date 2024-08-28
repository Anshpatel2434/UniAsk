from django.urls import path
from .views import *

urlpatterns = [
    path("student/students", StudentView.as_view()),
    path("student/addStudent", CreateStudentView.as_view()),
    path("student/signup", StudentSignupView.as_view()),
    path("student/signin", StudentSigninView.as_view()),
    path("student/getStudent", GetStudentView.as_view()),
    path("student/getStudentById/<int:student_id>", GetStudentByIdView.as_view()),
    path("doubt/postDoubt" , PostDoubtView.as_view()),
    path("doubt/allDoubt" , GetAllDoubtView.as_view()),
    path("doubt/getDoubt/<int:doubt_id>" , GetDoubtView.as_view()),
    path('solution/postSolution/<int:doubt_id>', PostSolutionView.as_view()),
    path('solution/getSolution/<int:solution_id>', GetSolutionView.as_view()),
    path('vote/postVote', UpdateVoteView.as_view()),
    path('chat/createChatGroup', CreateChatGroup.as_view()),
    path('chat/<str:chat_name>/postMessage', PostMessageView.as_view()),
    path('chat/getChats/<str:chat_name>', GetChatsView.as_view()),
]
