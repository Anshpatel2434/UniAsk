# Generated by Django 5.1 on 2024-08-25 09:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_doubt_doubtfor'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='noOfDoubts',
            field=models.BigIntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='noOfSolutions',
            field=models.BigIntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='noOfUpvotes',
            field=models.BigIntegerField(default=1),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Votes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=5)),
                ('solution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='votes', to='api.solution')),
                ('votedBy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='votes', to='api.student')),
            ],
        ),
    ]
