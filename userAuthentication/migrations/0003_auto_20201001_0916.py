# Generated by Django 3.0.8 on 2020-10-01 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userAuthentication', '0002_auto_20200929_1445'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, default='profile_images/avatar.jpg', upload_to='profile_images'),
        ),
    ]
