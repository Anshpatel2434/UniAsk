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
    noOfDoubts = models.BigIntegerField()
    noOfSolutions = models.BigIntegerField()
    noOfUpvotes = models.BigIntegerField()

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
    upvotes = models.BigIntegerField(default=0)

    def __str__(self):
        return self.solution[:50]
    
class Vote(models.Model):
    type = models.CharField(max_length=5)
    solution = models.ForeignKey(Solution, on_delete=models.CASCADE, related_name='votes')
    votedBy = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='votes')

class ChatGroup(models.Model):
    name = models.CharField(max_length=100, unique=True)
    createdOn = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.name


class Message(models.Model):
    chatGroup = models.ForeignKey(ChatGroup, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='messages')
    message = models.CharField(max_length=1000)