from django.urls import path
from . import views

app_name = "course-api-v1"

urlpatterns = [
    #path('article/category/<slug:category_slug>', views.GetCoursesOfCategoryApi.as_view(), name="courses-of-category"),
    path('articles', views.GetAllArticles.as_view(), name="articles"),
    path('articles/<slug:slug>', views.ArticleInfoApi.as_view(), name="course-info"),
]
