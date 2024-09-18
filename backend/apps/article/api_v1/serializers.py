from rest_framework import serializers

from ..models import ArticleCategory, Article
from ...account.api_v1.serializers import CreatorSerializer


class ArticleCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleCategory
        fields = ['id', 'title', 'slug']


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'cover', 'slug', 'creator', 'description']


class ArticleInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'description', 'body', 'cover',
                  'slug', 'created_date', 'last_updated']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["category"] = ArticleCategorySerializer(instance.category).data
        rep["creator"] = CreatorSerializer(instance.creator).data
        return rep
