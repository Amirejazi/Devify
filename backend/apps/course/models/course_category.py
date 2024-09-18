from ...main.models import BaseModel
from django.db import models


class CourseCategory(BaseModel):
    title = models.CharField(max_length=255, verbose_name='عنوان گروه')
    slug = models.SlugField(max_length=255, unique=True, verbose_name='عنوان در url')
    is_active = models.BooleanField(default=False, verbose_name='فعال/غیر فعال')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'گروه دوره'
        verbose_name_plural = 'گروه دوره ها'
        db_table = 't_course_categories'
