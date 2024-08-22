from django.db import models
from datetime import datetime

# Create your models here.
class Student(models.Model):
    dep = models.CharField(max_length=50)
    branch = models.CharField(max_length=10)
    roll_no = models.CharField(max_length=100)
    enr_no = models.CharField(max_length=100)
    batch = models.CharField(max_length=10)  
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name
    
class Doubt(models.Model):
    subject = models.CharField(max_length=100)
    doubt = models.CharField(max_length=1000)
    postedBy = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='doubts')
    postedOn = models.DateTimeField(default=datetime.now)
    doubtFor = models.CharField(max_length=100)

    def __str__(self):
        return self.subject

class Solution(models.Model):
    doubt = models.ForeignKey(Doubt, on_delete=models.CASCADE, related_name='solutions')
    solution = models.CharField(max_length=1000)
    postedBy = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='solutions')
    postedOn = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.solution[:50]
