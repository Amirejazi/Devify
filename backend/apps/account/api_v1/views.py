from datetime import timedelta
from django.conf import settings
from django.contrib.auth.models import update_last_login
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegistrationSerializer, LoginSerializer
from ..authenticate import CustomAuthentication


class RegistrationApiView(GenericAPIView):
    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            update_last_login(None, user)

            response = Response({
                'detail': 'User registered successfully',
            }, status=status.HTTP_201_CREATED)

            # Set HttpOnly cookies
            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                value=str(access),
                domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
                path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"],
                expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"] - timedelta(minutes=1),
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            )

            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=60 * 60 * 24 - 10 * 60
            )

            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginApiView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            update_last_login(None, user)

            # تنظیم HttpOnly Cookies برای توکن‌ها
            response = Response({
                'success': True,
            }, status=status.HTTP_200_OK)

            # ذخیره accessToken به صورت HttpOnly Cookie
            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                value=str(access),
                domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
                path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"],
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"] - timedelta(minutes=1),
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            )

            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=60 * 60 * 24 - 10 * 60
            )

            return response

        return Response({
            'success': False,
            'message': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class RefreshTokenView(GenericAPIView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])

        if refresh_token is None:
            return Response({'detail': 'Refresh token not found in cookies.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify and create new access token
            refresh = RefreshToken(refresh_token)
            access_token = refresh.access_token
            response = Response({'message': 'Access token refreshed successfully'}, status=status.HTTP_200_OK)
            print(access_token)
            # Set new access token in an httpOnly cookie
            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                value=str(access_token),
                domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
                path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"],
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"] - timedelta(minutes=1),
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            )
            return response

        except TokenError:
            return Response({'detail': 'Invalid or expired refresh token.'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteAuthCookiesView(GenericAPIView):
    def post(self, request):
        access_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"])
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"])
        response = Response({"detail": "Successfully deleted token cookies"}, status=status.HTTP_200_OK)

        if refresh_token:
            response.delete_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"],
                path='/',
            )

        if access_token:
            response.delete_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
                path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"],
            )
        return response


class GetMeView(APIView):
    authentication_classes = [CustomAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_data = {
            "name": user.name,
            "email": user.email,
            'phone': user.phone,
            'username': user.username,
        }

        return Response(user_data)
