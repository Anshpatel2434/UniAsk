# Generated by Django 5.1 on 2024-08-20 13:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_doubt_solution'),
    ]

    operations = [
        migrations.AddField(
            model_name='doubt',
            name='doubtFor',
            field=models.CharField(default='B2', max_length=100),
            preserve_default=False,
        ),
    ]