from rest_framework.views import APIView
from rest_framework import generics,status
from rest_framework.response import Response
from .models import *
from .serializer import *

# Create your views here.
class StudentView(generics.ListAPIView):
    queryset = Student.objects.all() 
    serializer_class = StudentSerializer

class CreateStudentView(generics.CreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def create(self, request, *args, **kwargs):
        # Check if the request data is a list (multiple JSON objects)
        if isinstance(request.data, list):
            # Serialize each object in the list
            serializer = self.get_serializer(data=request.data, many=True)
        else:
            # If it's a single object, handle normally
            serializer = self.get_serializer(data=request.data)

        # Validate and save the data
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Return a response with the serialized data
        return Response(serializer.data, status=status.HTTP_201_CREATED)