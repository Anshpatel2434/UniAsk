from rest_framework import serializers
from .models import *

class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('id', 'dep', 'branch', 'roll_no', 'enr_no', 'batch', 'name', 'noOfDoubts', 'noOfSolutions', 'noOfUpvotes')

class DoubtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doubt
        fields = ['id', 'subject', 'doubt', 'postedBy', 'postedOn', 'doubtFor']

class SolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solution
        fields = ['id', 'doubt', 'solution', 'postedBy', 'postedOn', 'upvotes']

class CreateStudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('dep', 'branch', 'roll_no', 'enr_no', 'batch', 'name')

class StudentSignupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student    
        fields = ('enr_no', 'password')

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value       
    
class VoteSerializer(serializers.ModelSerializer):
    # Correcting how related fields are serialized
    solution = serializers.PrimaryKeyRelatedField(read_only=True)  # Correct if you only need the primary key
    votedBy = StudentSerializer(read_only=True)

    class Meta:
        model = Vote
        fields = ('id', 'votedBy', 'solution', 'type')

class PostVoteSerializer(serializers.ModelSerializer):
    solution = serializers.PrimaryKeyRelatedField(read_only=True)  # Correct if you only need the primary key
    votedBy = StudentSerializer(read_only=True)

    class Meta:
        model = Vote      
        fields = ('type', 'solution', 'votedBy')  

    
class GetSolutionSerializer(serializers.ModelSerializer):
    postedBy = StudentSerializer(read_only=True)  # To display the name of the student who posted the solution
    votes = VoteSerializer(many=True, read_only=True)

    class Meta:
        model = Solution
        fields = ['id', 'solution', 'postedBy', 'postedOn', 'votes', 'upvotes']

class GetDoubtSerializer(serializers.ModelSerializer):
    postedBy = StudentSerializer(read_only=True)  # To display the name of the student who posted the doubt
    solutions = GetSolutionSerializer(many=True, read_only=True)  # Nested serializer to include related solutions

    class Meta:
        model = Doubt
        fields = ['id', 'subject', 'doubt', 'postedBy', 'postedOn', 'solutions', 'doubtFor']

class PostDoubtSerializer(serializers.ModelSerializer):
    postedBy = StudentSerializer(read_only=True)  

    class Meta:
        model = Doubt
        fields = ['subject', 'doubt', 'postedBy', 'doubtFor']

    def validate(self, attrs):
        # Ensure the subject is one of the allowed values
        allowed_subjects = ['FSD', 'Python', 'DM', 'TOC', 'COA']
        if attrs.get('subject') not in allowed_subjects:
            raise serializers.ValidationError({
                'error': f"Subject must be one of the following: {', '.join(allowed_subjects)}."
            })

        # Ensure the doubt is not empty
        if not attrs.get('doubt'):
            raise serializers.ValidationError({
                'error': "Doubt field cannot be empty."
            })

        return attrs
    
class PostSolutionSerializer(serializers.ModelSerializer):
    postedBy = StudentSerializer(read_only=True)
    doubt = DoubtSerializer(read_only=True)

    class Meta:
        model = Solution
        fields = ['doubt', 'postedBy', 'solution']

    def validate(self, attrs):
        # Ensure the solution is not empty
        if not attrs.get('solution'):
            raise serializers.ValidationError({
                'error': "Solution field cannot be empty."
                })
        
        return attrs
    
class StudentIdSerializer(serializers.ModelSerializer):
    doubts = DoubtSerializer(many=True, read_only=True)
    solutions = SolutionSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = ['id', 'dep', 'branch', 'roll_no', 'enr_no', 'batch', 'name', 'noOfDoubts', 'noOfSolutions', 'noOfUpvotes', 'doubts', 'solutions']
