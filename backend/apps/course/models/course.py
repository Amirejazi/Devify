import os
from uuid import uuid4

from django.contrib.auth import get_user_model
from django.db import models

from . import CourseCategory
from ...main.models import BaseModel

User = get_user_model()


def upload_course_image(instance, filename):
    ext = os.path.splitext(filename)[-1]
    return f"uploads/course_images/{uuid4()}{ext}"


class Course(BaseModel):
    name = models.CharField(max_length=255, verbose_name='نام دوره')
    description = models.TextField(verbose_name='توضیحات')
    cover = models.ImageField(max_length=255, upload_to=upload_course_image, verbose_name='تصویر دوره')
    price = models.PositiveIntegerField(verbose_name='قیمت محصول')
    slug = models.SlugField(max_length=255, unique=True, verbose_name='عنوان در url')
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses', verbose_name='کاربر اد کننده')
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE, related_name='courses', verbose_name='گروه دوره')
    is_complete = models.BooleanField(verbose_name='تمام شده/ درحال برگزاری')
    support = models.CharField(max_length=255, null=True, verbose_name='پشتیبانی دوره')
    is_active = models.BooleanField(default=False, verbose_name='فعال/غیرفعال')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'دوره'
        verbose_name_plural = 'دوره ها'
        db_table = 't_courses'
