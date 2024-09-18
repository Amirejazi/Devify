from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView
)

from . import views

app_name = "account-api-v1"

urlpatterns = [
    path('register', views.RegistrationApiView.as_view(), name="register-user"),
    path('login', views.LoginApiView.as_view(), name='login'),
    path('me', views.GetMeView.as_view(), name="get-me"),
    path('refresh', TokenRefreshView.as_view(), name='token_refresh')

    # path('jwt/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
