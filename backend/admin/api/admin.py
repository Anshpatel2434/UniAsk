from django.contrib import admin
from .models import *

class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'dep', 'branch', 'roll_no', 'enr_no', 'batch')

class DoubtAdmin(admin.ModelAdmin):
    list_display = ('id', 'subject', 'postedBy', 'postedOn', 'doubtFor')

class SolutionAdmin(admin.ModelAdmin):
    list_display = ('id', 'doubt', 'solution', 'postedBy', 'postedOn')

class VoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'solution', 'votedBy')    

admin.site.register(Student, StudentAdmin)
admin.site.register(Doubt, DoubtAdmin)
admin.site.register(Solution, SolutionAdmin)
admin.site.register(Vote, VoteAdmin)