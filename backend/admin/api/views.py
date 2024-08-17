from rest_framework.views import APIView
from rest_framework import generics,status
from rest_framework.response import Response
from .models import *
from .serializer import *
import jwt
from datetime import timedelta
from django.utils import timezone
from django.contrib.auth.hashers import make_password,check_password
from rest_framework.permissions import AllowAny
from django.conf import settings

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
    
class StudentSignupView(APIView):
    permission_classes = [AllowAny]


    def post(self, request, format=None):
        serializer = StudentSignupSerializer(data=request.data)
        if serializer.is_valid():
            try:
                student = Student.objects.filter(enr_no=serializer.validated_data.get('enr_no')).first()
                if student:
                    if student.password:
                        return Response({
                            'status': 400,
                            'message': 'Student already Registered'
                        })
                    else:
                        student.password = make_password(serializer.validated_data.get('password'))
                        student.save(update_fields=['password'])
                        jwt_token = self.create_jwt(student)
                        return Response({'jwt': jwt_token, 
                                         'student': student.name,
                            'enr_no': student.enr_no,
                            'dep':student.dep,
                            'branch':student.branch,
                            'roll_no':student.roll_no,
                            'batch':student.batch,})
                else:
                    return Response({
                        'status': 404,
                        'message': 'Incorrect Enrollment Number'
                    })
            except Exception as e:
                return Response({
                    'status': 500,
                    'message': 'Error while creating student',
                    'error': str(e)
                })
        else:
            print(serializer.error_messages)
            return Response({
                'status': 406,
                'message': serializer.errors['password'][0]
            })

    def create_jwt(self, student):
        payload = {
            'enr_no': student.enr_no,
            'exp': timezone.now() + timedelta(hours=1),
            'iat': timezone.now()
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token

class StudentSigninView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = StudentSignupSerializer(data=request.data)
        if serializer.is_valid():
            try:
                student = Student.objects.filter(enr_no=serializer.validated_data.get('enr_no')).first()
                if student:
                    if not check_password(serializer.validated_data.get('password'), student.password):
                        return Response({
                            'status': 401,
                            'message': 'Incorrect Password'
                        })
                    else:
                        jwt_token = self.create_jwt(student)
                        return Response({
                            'status': 201,
                            'jwt': jwt_token,
                            'name': student.name,
                            'enr_no': student.enr_no,
                            'dep':student.dep,
                            'branch':student.branch,
                            'roll_no':student.roll_no,
                            'batch':student.batch,
                        })
                else:
                    return Response({
                        'status': 404,
                        'message': 'Incorrect Enrollment Number'
                    })
            except Exception as e:
                return Response({
                    'status': 500,
                    'message': 'Error while creating student',
                    'error': str(e)
                })
        else:
            return Response({
                'status': 406,
                'message': serializer.errors['password'][0]
            })

    def create_jwt(self, student):
        payload = {
            'enr_no': student.enr_no,
            'exp': timezone.now() + timedelta(hours=1),  # Token expires in 1 hour
            'iat': timezone.now()  # Issued at time
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token

class GetStudentView(APIView):
    permission_classes = [AllowAny]  # Ensure the user is authenticated

    def get(self, request, format=None):
        try:
            # Extract token from the Authorization header
            token = request.headers.get('Authorization', '')
            if not token:
                return Response({
                    'status': 401,
                    'message': 'No token provided'
                })

            # Decode token to get user information
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            student = Student.objects.filter(enr_no=payload.get('enr_no')).first()

            if student:
                # Return user data
                user_data = {
                    'dep': student.dep,
                    'branch': student.branch,
                    'roll_no': student.roll_no,
                    'enr_no': student.enr_no,
                    'batch': student.batch,
                    'name': student.name
                }
                return Response({
                    'status': 200,
                    'student': user_data
                })
            else:
                return Response({
                    'status': 404,
                    'message': 'User not found'
                })
        except Exception as e:
            return Response({
                'status': 500,
                'message': 'Error while fetching user data',
                'error': str(e)
            })