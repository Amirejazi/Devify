from django.contrib.auth import get_user_model
from .course import Course
from ...main.models import BaseModel
from django.db import models

User = get_user_model()


class CourseComment(BaseModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='comments', verbose_name='دوره')
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments', verbose_name='کاربر ثبت کننده نظر')
    body = models.TextField(max_length=700, verbose_name='متن نظر')
    parent = models.ForeignKey('CourseComment', blank=True, null=True, db_index=True, on_delete=models.CASCADE, verbose_name='گروه والد')
    is_admin_read = models.BooleanField(default=False, verbose_name='دیده شدن توسط ادمین')

    def __str__(self):
        return f"نظر کاربر {self.creator.name} برای دوره {self.course.name}"

    class Meta:
        ordering = ['-created_date']
        verbose_name = 'نظر'
        verbose_name_plural = 'نظر ها'
        db_table = 't_comments'
