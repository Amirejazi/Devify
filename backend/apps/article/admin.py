from admin_decorators import short_description
from django.contrib import admin
from django.utils.html import format_html

from .models import ArticleCategory, Article


@admin.register(ArticleCategory)
class ArticleCategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'get_created_date_shamsi', 'get_updated_date_shamsi')
    search_fields = ('title',)
    ordering = ('title',)


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'image_tag', 'is_active', 'get_created_date_shamsi', 'get_updated_date_shamsi')
    list_filter = ('category', 'creator', 'is_active')
    search_fields = ('title', 'category', 'creator')
    ordering = ('last_updated', 'title',)
    list_editable = ['is_active']

    @short_description('تصویر دوره')
    def image_tag(self, obj):
        return format_html(f'<img src="/media/{obj.cover}" style="width:200px" /> ')