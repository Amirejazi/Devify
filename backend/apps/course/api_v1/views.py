from django.shortcuts import get_object_or_404
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from .pagination import DefaultPagination
from .serializers import TopbarLinksSerializer, MenusSerializer, CoursesSerializer, CourseInfoSerializer
from ..models import Course, CourseCategory


class GetTopBarLinksApi(GenericAPIView):
    serializer_class = TopbarLinksSerializer

    def get(self, request):
        courses = Course.objects.all()
        serializer = self.serializer_class(courses, many=True)
        return Response(serializer.data)


class GetMenusApi(GenericAPIView):
    serializer_class = MenusSerializer

    def get(self, request):
        categories = CourseCategory.objects.all()
        serializer = self.serializer_class(categories, many=True)
        return Response(serializer.data)


class GetCoursesOfCategoryApi(GenericAPIView):
    serializer_class = CoursesSerializer
    pagination_class = DefaultPagination

    def get(self, request, category_slug):
        try:
            category = CourseCategory.objects.get(slug=category_slug)
            paginated_courses = self.paginate_queryset(category.courses.filter(is_active=True))
            serializer = self.serializer_class(paginated_courses, many=True)
            return self.get_paginated_response(serializer.data)
        except CourseCategory.DoesNotExist:
            return Response([])


class GetAllCourses(GenericAPIView):
    serializer_class = CoursesSerializer
    pagination_class = DefaultPagination

    def get(self, request):
        courses = Course.objects.filter(is_active=True)
        paginated_courses = self.paginate_queryset(courses)
        serializer = self.serializer_class(paginated_courses, many=True)
        return self.get_paginated_response(serializer.data)


class GetCourseInfo(GenericAPIView):
    serializer_class = CourseInfoSerializer

    def get(self, request, slug):
        course = get_object_or_404(Course, slug=slug)
        serializer = self.serializer_class(course)
        return Response(serializer.data)
