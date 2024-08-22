# Generated by Django 5.1 on 2024-08-20 11:48

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_student_enr_no_alter_student_roll_no'),
    ]

    operations = [
        migrations.CreateModel(
            name='Doubt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=100)),
                ('doubt', models.CharField(max_length=1000)),
                ('postedOn', models.DateTimeField(default=datetime.datetime.now)),
                ('postedBy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='doubts', to='api.student')),
            ],
        ),
        migrations.CreateModel(
            name='Solution',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('solution', models.CharField(max_length=1000)),
                ('postedOn', models.DateTimeField(default=datetime.datetime.now)),
                ('doubt', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='solutions', to='api.doubt')),
                ('postedBy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='solutions', to='api.student')),
            ],
        ),
    ]