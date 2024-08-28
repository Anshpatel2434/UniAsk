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
                            'message': 'Account Already exists, Please SignIn'
                        })
                    else:
                        student.password = make_password(serializer.validated_data.get('password'))
                        student.save(update_fields=['password'])
                        jwt_token = self.create_jwt(student)
                        return Response({
                            'status': 200,
                            'jwt': jwt_token, 
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
                    'message': 'You are not Registered yet',
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
                    'id': student.id,
                    'dep': student.dep,
                    'branch': student.branch,
                    'roll_no': student.roll_no,
                    'enr_no': student.enr_no,
                    'batch': student.batch,
                    'name': student.name,
                    'noOfDoubts':student.noOfDoubts,
                    'noOfSolutions':student.noOfSolutions,
                    'noOfUpvotes':student.noOfUpvotes
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
        
class PostDoubtView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        try:
            token = request.headers.get('Authorization', '')
            if not token:
                return Response({
                    'status': 401,
                    'message': 'Please log in first.'
                })

            # Decode token to get user information
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                return Response({
                    'status': 401,
                    'message': 'Token has expired. Please log in again.'
                })
            except jwt.InvalidTokenError:
                return Response({
                    'status': 401,
                    'message': 'Invalid token. Please log in again.'
                })

            student = Student.objects.filter(enr_no=payload.get('enr_no')).first()
            if not student:
                return Response({
                    'status': 404,
                    'message': 'Student not found.'
                })
            
            typeOfDoubt = request.data['doubtFor']
            if(typeOfDoubt == 'All'):
                typeOfDoubt = 'All'
            elif(typeOfDoubt == 'Batch'):
                typeOfDoubt = student.batch
            elif(typeOfDoubt == 'Department'):
                typeOfDoubt = student.dep
            else:
                return Response({
                    'status': 400,
                    'message' : 'Please provide a type for doubt'
                })            

            # Create serializer with the validated data
            serializer = PostDoubtSerializer(data={
                'subject': request.data['subject'],
                'doubt': request.data['doubt'],
                'doubtFor' : typeOfDoubt
            })


            try:
                if serializer.is_valid():
                # Manually assign the student instance to the postedBy field before saving
                
                    student.noOfDoubts += 1
                    student.save()
                    serializer.save(postedBy=student)
                    return Response({
                        'status': 200,
                        'message': 'The doubt is successfully posted.'
                    })
                else:
                    return Response({
                        'status': 400,
                        'errors': serializer.errors['error'][0]
                    })
            except Exception as e:
                return Response({
                    'status': 500,
                    'message': serializer.errors['error'][0]
                })

        except Exception as e:
            return Response({
                'status': 500,
                'message': f'Error while posting doubt: {str(e)}'
            })
        
class PostSolutionView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, doubt_id, format=None):
        try:
            token = request.headers.get('Authorization', '')
            if not token:
                return Response({
                    'status': 401,
                    'message': 'Please log in first.'
                })
            
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                return Response({
                    'status': 401,
                    'message': 'Token has expired. Please log in again.'
                })
            except jwt.InvalidTokenError:
                return Response({
                    'status': 401,
                    'message': 'Invalid token. Please log in again.'
                })

            student = Student.objects.filter(enr_no=payload.get('enr_no')).first()

            if not student:
                return Response({
                    'status': 404,
                    'message': 'Student not found.'
                })
            
            doubt = Doubt.objects.filter(id=doubt_id).first()

            serializer = PostSolutionSerializer(data={
                'solution': request.data.get('solution'),
            })

            try:
                if serializer.is_valid():
                # Manually assign the student instance to the postedBy field before saving
                    student.noOfSolutions += 1
                    student.save()
                    serializer.save(postedBy=student, doubt=doubt)
                    return Response({
                        'status': 200,
                        'message': 'The solution is successfully posted.'
                    })
                else:
                    return Response({
                        'status': 400,
                        'errors': serializer.errors['error'][0]
                    })
            except Exception as e:
                return Response({
                    'status': 500,
                    'message': serializer.errors['error'][0]
                })
            
            
        except Exception as e:
            return Response({
                'status': 500,
                'message': f'Error while posting doubt: {str(e)}'
            })

class GetDoubtView(APIView):
    permission_classes = [AllowAny]  # No authentication required for this view

    def get(self, request, doubt_id, format=None):
        try:
            # Extract token from the Authorization header
            token = request.headers.get('Authorization', '')
            if not token:
                return Response({
                    'status': 401,
                    'message': 'No token provided'
                })

            # Fetch the doubt object
            doubt = Doubt.objects.filter(id=doubt_id).first()

            if doubt:
                # Serialize the doubt object using the GetDoubtSerializer
                serializer = GetDoubtSerializer(doubt)
                return Response({
                    'status': 200,
                    'doubt': serializer.data  # Return serialized data
                })
            
            # If doubt is not found
            return Response({
                'status': 404,
                'message': 'Doubt not found'
            })
            
        except Exception as e:
            # Handle any other exceptions
            return Response({
                'status': 500,
                'message': 'Error while fetching doubt data',
                'error': str(e)
            })
        
class GetSolutionView(APIView):
    permission_classes = [AllowAny]  # No authentication required for this view

    def get(self, request, solution_id, format=None):
        try:
            # Extract token from the Authorization header
            token = request.headers.get('Authorization', '')
            if not token:
                return Response({
                    'status': 401,
                    'message': 'No token provided'
                })

            # Fetch the doubt object
            solution = Solution.objects.filter(id=solution_id).first()

            if solution:
                # Serialize the doubt object using the GetDoubtSerializer
                serializer = GetSolutionSerializer(solution)
                return Response({
                    'status': 200,
                    'solution': serializer.data  # Return serialized data
                })
            
            # If doubt is not found
            return Response({
                'status': 404,
                'message': 'Solution not found'
            })
            
        except Exception as e:
            # Handle any other exceptions
            return Response({
                'status': 500,
                'message': 'Error while fetching doubt data',
                'error': str(e)
            })

class UpdateVoteView(APIView):
    permission_classes = [AllowAny]  # No authentication required for this view

    def post(self, request, format=None):
        try:
            # Extract token from the Authorization header
            token = request.headers.get('Authorization', '')
            if not token:
                return Response({
                    'status': 401,
                    'message': 'No token provided'
                })
            
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            except jwt.ExpiredSignatureError:
                return Response({
                    'status': 401,
                    'message': 'Token has expired. Please log in again.'
                })
            except jwt.InvalidTokenError:
                return Response({
                    'status': 401,
                    'message': 'Invalid token. Please log in again.'
                })

            # Fetch the student based on token's enrollment number
            student = Student.objects.filter(enr_no=payload.get('enr_no')).first()

            if not student:
                return Response({
                    'status': 404,
                    'message': 'Student not found.'
                })
            
            # Fetch the solution object
            solution = Solution.objects.filter(id=request.data.get('solution_id')).first()

            if not solution:
                return Response({
                    'status': 404,
                    'message': 'Solution not found'
                })
            
            # Fetch student of the solution
            studentOfSolution = Student.objects.filter(id=solution.postedBy.id).first()
            
            # Retrieve vote type from the request data
            typeOfVote = request.data.get('type')
            if typeOfVote not in ['UP', 'DOWN']:
                return Response({
                    'status': 400,
                    'message': 'Please provide a valid type for vote'
                })

            # Check if a vote already exists
            existing_vote = Vote.objects.filter(votedBy=student, solution=solution).first()

            if existing_vote:
                # Update vote if the type is different
                if existing_vote.type != typeOfVote:
                    # Adjust upvotes based on the existing vote
                    if existing_vote.type == 'UP':
                        solution.upvotes -= 1
                        studentOfSolution.noOfUpvotes -= 1
                    elif existing_vote.type == 'DOWN':
                        solution.upvotes += 1
                        studentOfSolution.noOfUpvotes += 1
                    
                    # Adjust upvotes based on the new vote
                    if typeOfVote == 'UP':
                        solution.upvotes += 1
                        studentOfSolution.noOfUpvotes += 1
                    elif typeOfVote == 'DOWN':
                        solution.upvotes -= 1
                        studentOfSolution.noOfUpvotes -= 1
                    
                    # Update the existing vote type
                    existing_vote.type = typeOfVote
                    existing_vote.save()
                # No change if vote type is the same

            else:
                # Create a new vote if no existing vote
                if typeOfVote == 'UP':
                    solution.upvotes += 1
                    studentOfSolution.noOfUpvotes += 1
                elif typeOfVote == 'DOWN':
                    solution.upvotes -= 1
                    studentOfSolution.noOfUpvotes -= 1
                
                # Serialize the solution object using the PostVoteSerializer
                serializer = PostVoteSerializer(data={'type': typeOfVote})
                if serializer.is_valid():
                    serializer.save(votedBy=student, solution=solution)
                else:
                    return Response({
                        'status': 400,
                        'errors': serializer.errors
                    })
            
            # Save changes to solution and student of the solution
            solution.save()
            studentOfSolution.save()

            return Response({
                'status': 200,
                'message': 'The vote is successfully updated.'
            })
            
        except Exception as e:
            # Handle any other exceptions
            return Response({
                'status': 500,
                'message': 'Error while updating vote data',
                'error': str(e)
            })

class GetStudentByIdView(APIView):
    
    permission_classes = [AllowAny]  # Ensure the user is authenticated

    def get(self, request, student_id, format=None):
        try:
            # Extract token from the Authorization header
            token = request.headers.get('Authorization', '')
            if not token:
                return Response({
                    'status': 401,
                    'message': 'No token provided'
                })

            student = Student.objects.filter(id=student_id).first()

            if student:
                # Serialize the student data
                serializer = StudentIdSerializer(student)
                return Response({
                    'status': 200,
                    'student': serializer.data
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

class GetAllDoubtView(APIView):
    permission_classes = [AllowAny]  # No authentication required for this view

    def get(self, request, format=None):
        try:
            # Extract token from the Authorization header
            token = request.headers.get('Authorization', '')
            if not token:
                return Response({
                    'status': 401,
                    'message': 'No token provided'
                })

            # Fetch the doubt object
            doubt = Doubt.objects.all()

            if doubt:
                # Serialize the doubt object using the GetDoubtSerializer
                serializer = DoubtSerializer(doubt, many=True)
                return Response({
                    'status': 200,
                    'doubts': serializer.data  # Return serialized data
                })
            
            # If doubt is not found 
            return Response({
                'status': 404,
                'message': 'Doubts not found'
            })
            
        except Exception as e:
            # Handle any other exceptions
            return Response({
                'status': 500,
                'message': 'Error while fetching doubt data',
                'error': str(e)
            })

class CreateChatGroup(APIView):      
    def post(self, request, format=None):
        try:
            # Extract token from the Authorization header
            token = request.headers.get('Authorization', '')
            if not token:
                return Response({
                    'status': 401,
                    'message': 'No token provided'
                })
            
            group = ChatGroup.objects.filter(name=request.data.get('name')).first()

            if group:
                return Response({
                    'status': 400,
                    'message': 'Group already exists'
                })
            
            serializer = CreateChatGroupSerializer(data={
                'name': request.data.get('name'),
            })

            try:
                if serializer.is_valid():
                    serializer.save()
                    return Response({
                        'status': 200,
                        'message': 'The chat group is successfully created'
                    })
                else:
                    return Response({
                        'status': 400,
                        'errors': serializer.errors['error'][0]
                    })
            except Exception as e:
                return Response({
                    'status': 500,
                    'message': serializer.errors['error'][0]
                })   
                

        except Exception as e:
            # Handle any other exceptions
            return Response({
                'status': 500,
                'message': 'Error while fetching doubt data',
                'error': str(e)
            })      

        
class PostMessageView(APIView):
    def post(self, request, chat_name, format=None):
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
            
            chat_group = ChatGroup.objects.filter(name=chat_name).first()

            if not chat_group:
                return Response({
                    'stauts': 404,
                    'message': 'Chat group not found'
                })
            
            serializer = CreateMessageSerializer(data={
                'message' : request.data.get('message')
            })

            try:
                if serializer.is_valid():
                    serializer.save(chatGroup=chat_group, sender=student)
                    return Response({
                        'status': 200,
                        'message': 'The message is successfully posted.'
                    })
                else:
                    return Response({
                        'status': 400,
                        'errors': serializer.errors['error'][0]
                    })
            except Exception as e:
                return Response({
                    'status': 500,
                    'message': serializer.errors['error'][0]
                })    

        except Exception as e:
            # Handle any other exceptions
            return Response({
                'status': 500,
                'message': 'Error while fetching doubt data',
                'error': str(e)
            })       

class GetChatsView(APIView):

    def get(self, request, chat_name, format=None):
        try:
            # Extract token from the Authorization header
            token = request.headers.get('Authorization', '')
            if not token:
                return Response({
                    'status': 401,
                    'message': 'No token provided'
                })
            
            chat_group = ChatGroup.objects.filter(name=chat_name).first()

            if not chat_group:
                return Response({
                    'stauts': 404,
                    'message': 'Chat group not found'
                })
            
            serializer = GetChatsSerializer(chat_group)
            return Response({
                        'status': 200,
                        'chats': serializer.data
                    })

        except Exception as e:
            # Handle any other exceptions
            return Response({
                'status': 500,
                'message': 'Error while fetching doubt data',
                'error': str(e)
            })             