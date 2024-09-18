from django.urls import path
from . import views

app_name = "course-api-v1"

urlpatterns = [
    path('menus/topbar', views.GetTopBarLinksApi.as_view(), name="topbar-links"),
    path('menus', views.GetMenusApi.as_view(), name="menus"),
    path('courses/category/<slug:category_slug>', views.GetCoursesOfCategoryApi.as_view(), name="courses-of-category"),
    path('courses', views.GetAllCourses.as_view(), name="courses"),
    path('courses/<slug:slug>', views.GetCourseInfo.as_view(), name="course-info"),
]
