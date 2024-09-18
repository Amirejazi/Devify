from admin_decorators import short_description
from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html

from .models import CourseCategory, Course


@admin.register(CourseCategory)
class CourseCategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'get_created_date_shamsi', 'get_updated_date_shamsi')
    search_fields = ('title',)
    ordering = ('title',)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'image_tag', 'is_active', 'get_created_date_shamsi', 'get_updated_date_shamsi')
    list_filter = ('category', 'creator', 'is_active')
    search_fields = ('name', 'category', 'creator')
    ordering = ('last_updated', 'name',)
    list_editable = ['is_active']

    @short_description('تصویر دوره')
    def image_tag(self, obj):
        return format_html(f'<img src="/media/{obj.cover}" style="width:200px" /> ')

    def view_episodes(self, obj):
        url = reverse('admin:course_session_changelist') + f'?course__id__exact={obj.id}'
        return format_html('<a class="btn-sm btn-primary" href="{}">نمایش قسمت‌ها</a>', url)

    view_episodes.short_description = 'نمایش قسمت‌ها'
