import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient

from ..api_v1.serializers import TopbarLinksSerializer, MenusSerializer, CoursesSerializer, CourseInfoSerializer
from ..models import Course, CourseCategory


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def common_user():
    user = get_user_model().objects.create_user(
        phone='09123456789',
        name='test',
        username='user_test',
        password='123'
    )
    return user


@pytest.fixture
def create_categories(db):
    CourseCategory.objects.create(title="Programming", slug="programming")
    CourseCategory.objects.create(title="Data Science", slug="data-science")

@pytest.fixture
def create_course(db, common_user):
    category = CourseCategory.objects.create(title="Programming", slug="programming")
    course = Course.objects.create(
        name='Python Basics',
        description='A course about Python programming.',
        cover='path/to/image.png',
        price=100000,
        creator=common_user,
        category=category,
        is_complete=False,
        support='Email support',
        is_active=True,
        slug='python-basics'
    )


@pytest.mark.django_db
class TestGetTopBarLinksApi:
    def test_get_top_bar_links(self, api_client, create_course):
        url = reverse('course-api-v1:topbar-links')
        response = api_client.get(url)

        assert response.status_code == 200
        courses = Course.objects.all()
        serializer = TopbarLinksSerializer(courses, many=True)
        assert response.data == serializer.data


@pytest.mark.django_db
class TestGetMenusApi:
    def test_get_menus(self, api_client, create_categories):
        url = reverse('course-api-v1:menus')
        response = api_client.get(url)

        assert response.status_code == 200
        categories = CourseCategory.objects.all()
        serializer = MenusSerializer(categories, many=True)
        assert response.data == serializer.data


@pytest.mark.django_db
class TestGetCoursesOfCategoryApi:
    def test_get_courses_of_category(self, api_client, create_course):
        url = reverse('course-api-v1:courses-of-category', args=['programming'])
        response = api_client.get(url)

        assert response.status_code == 200
        category = CourseCategory.objects.get(slug='programming')
        courses = category.courses.filter(is_active=True)
        serializer = CoursesSerializer(courses, many=True)
        assert response.data['result'] == serializer.data

    def test_get_courses_of_nonexistent_category(self, api_client):
        url = reverse('course-api-v1:courses-of-category', args=['nonexistent-category'])
        response = api_client.get(url)

        assert response.status_code == 200
        assert response.data == []

@pytest.mark.django_db
class TestGetAllCoursesApi:
    def test_get_all_courses(self, api_client, create_course):
        url = reverse('course-api-v1:courses')
        response = api_client.get(url)

        assert response.status_code == 200
        courses = Course.objects.filter(is_active=True)
        serializer = CoursesSerializer(courses, many=True)
        assert response.data['result'] == serializer.data


@pytest.mark.django_db
class TestGetCourseInfoApi:
    def test_get_course_info(self, api_client, create_course):
        url = reverse('course-api-v1:course-info', args=['python-basics'])
        response = api_client.get(url)

        assert response.status_code == 200
        course = Course.objects.get(slug='python-basics')
        serializer = CourseInfoSerializer(course)
        assert response.data == serializer.data

    def test_get_nonexistent_course_info(self, api_client):
        url = reverse('course-api-v1:course-info', args=['nonexistent-course'])
        response = api_client.get(url)

        assert response.status_code == 404
