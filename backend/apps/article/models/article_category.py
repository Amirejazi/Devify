from ...main.models import BaseModel
from django.db import models


class ArticleCategory(BaseModel):
    title = models.CharField(max_length=255, verbose_name='عنوان گروه')
    slug = models.SlugField(max_length=255, verbose_name='عنوان در url')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'گروه مقاله'
        verbose_name_plural = 'گروه مقاله ها'
        db_table = 't_article_categories'
