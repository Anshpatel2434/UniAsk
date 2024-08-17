from rest_framework import serializers
from .models import *

class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('id', 'dep', 'branch', 'roll_no', 'enr_no', 'batch', 'name')

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