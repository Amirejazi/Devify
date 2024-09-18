import os
from uuid import uuid4
from django.contrib.auth import get_user_model
from django.db import models
from . import ArticleCategory
from ...main.models import BaseModel

User = get_user_model()


def upload_article_image(instance, filename):
    ext = os.path.splitext(filename)[-1]
    return f"uploads/article_images/{uuid4()}{ext}"


class Article(BaseModel):
    title = models.CharField(max_length=255, verbose_name='نام مقاله')
    description = models.TextField(verbose_name='توضیحات')
    body = models.TextField(verbose_name='متن مقاله')
    cover = models.ImageField(max_length=255, upload_to=upload_article_image, verbose_name='تصویر مفاله')
    slug = models.SlugField(max_length=255, verbose_name='عنوان در url')
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles', verbose_name='کاربر اد کننده')
    category = models.ForeignKey(ArticleCategory, on_delete=models.CASCADE, related_name='articles', verbose_name='گروه مفاله')
    is_active = models.BooleanField(default=False, verbose_name='فعال/غیرفعال')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'مقاله'
        verbose_name_plural = 'مقاله ها'
        db_table = 't_articles'
