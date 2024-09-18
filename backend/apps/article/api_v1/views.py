from django.shortcuts import get_object_or_404
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .pagination import DefaultPagination
from .serializers import ArticleSerializer, ArticleInfoSerializer
from ..models import ArticleCategory, Article


class GetArticlesOfCategoryApi(GenericAPIView):
    serializer_class = ArticleSerializer
    pagination_class = DefaultPagination

    def get(self, request, category_slug):
        try:
            category = ArticleCategory.objects.get(slug=category_slug)
            paginated_articles = self.paginate_queryset(category.articles.filter(is_active=True))
            serializer = self.serializer_class(paginated_articles, many=True)
            return self.get_paginated_response(serializer.data)
        except ArticleCategory.DoesNotExist:
            return Response([])


class GetAllArticles(GenericAPIView):
    serializer_class = ArticleSerializer
    pagination_class = DefaultPagination

    def get(self, request):
        articles = Article.objects.filter(is_active=True)
        paginated_articles = self.paginate_queryset(articles)
        serializer = self.serializer_class(paginated_articles, many=True)
        return self.get_paginated_response(serializer.data)


class ArticleInfoApi(GenericAPIView):
    serializer_class = ArticleInfoSerializer

    def get(self, request, slug):
        article = get_object_or_404(Article, slug=slug)
        serializer = self.serializer_class(article)
        return Response(serializer.data)
