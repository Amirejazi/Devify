from .course import Course
from ...main.models import BaseModel
from django.db import models


def upload_session_file(instance, filename):
    return f"coursefiles/{filename}"


class CourseSession(BaseModel):
    title = models.CharField(max_length=150, verbose_name='عنوان جلسه')
    time = models.DurationField(verbose_name='زمان')
    is_free = models.BooleanField(default=False, verbose_name='رایگان بودن')
    video = models.FileField(upload_to=upload_session_file, verbose_name='فایل جلسه')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='sessions', verbose_name='دوره مربوطه')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'جلسه'
        verbose_name_plural = 'جلسه ها'
        db_table = 't_sessions'
