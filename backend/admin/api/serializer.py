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