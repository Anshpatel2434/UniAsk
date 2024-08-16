from django.db import models

# Create your models here.
class Student(models.Model):
    dep = models.CharField(max_length=50)
    branch = models.CharField(max_length=10)
    roll_no = models.IntegerField()
    enr_no = models.BigIntegerField()
    batch = models.CharField(max_length=10)  
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name