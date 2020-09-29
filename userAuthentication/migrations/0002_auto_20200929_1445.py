# Generated by Django 3.0.8 on 2020-09-29 14:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAuthentication', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user_profile',
            name='profile_picture',
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, upload_to='profile_images'),
        ),
        migrations.AlterField(
            model_name='user_profile',
            name='bio',
            field=models.CharField(default='About Me', max_length=200),
        ),
    ]
