from rest_framework import serializers
from ..models import Course, CourseCategory, CourseSession
from ..models.course_comments import CourseComment
from ...account.api_v1.serializers import CreatorSerializer


class TopbarLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'slug']


class MenusSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ['id', 'title', 'slug']

    def to_representation(self, instance):
        request = self.context.get("request")
        rep = super().to_representation(instance)
        rep["submenus"] = TopbarLinksSerializer(instance.courses, many=True).data
        return rep


class SessionSerializer(serializers.ModelSerializer):

    class Meta:
        model = CourseSession
        fields = ['id', 'title', 'time', 'is_free']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseComment
        fields = ['id', 'body']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["creator"] = CreatorSerializer(instance.creator).data
        return rep


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ['id', 'title', 'slug']


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'cover', 'slug', 'price', 'creator']


class CourseInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'cover', 'support',
                  'slug', 'price', 'is_complete', 'created_date', 'last_updated']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["category"] = CategorySerializer(instance.category).data
        rep["creator"] = CreatorSerializer(instance.creator).data
        rep["sessions"] = SessionSerializer(instance.sessions, many=True).data
        rep["comments"] = CommentSerializer(instance.comments, many=True).data
        return rep
