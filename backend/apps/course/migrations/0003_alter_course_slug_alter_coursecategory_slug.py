# Generated by Django 5.1 on 2024-08-30 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0002_coursecomment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='slug',
            field=models.SlugField(max_length=255, unique=True, verbose_name='عنوان در url'),
        ),
        migrations.AlterField(
            model_name='coursecategory',
            name='slug',
            field=models.SlugField(max_length=255, unique=True, verbose_name='عنوان در url'),
        ),
    ]