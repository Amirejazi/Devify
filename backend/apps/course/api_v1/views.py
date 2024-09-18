from django.contrib.auth.models import update_last_login
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegistrationSerializer, LoginSerializer


class RegistrationApiView(GenericAPIView):
    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            update_last_login(None, user)

            return Response({
                'detail': 'User registered successfully',
                'user': {
                    'name': user.name,
                    'phone': user.phone,
                    'username': user.username,
                    'email': user.email,
                },
                'accessToken': str(access),
                'refreshToken': str(refresh)
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginApiView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = LoginSerializer.get_token(user)
            access = refresh.access_token
            update_last_login(None, user)

            return Response({
                'success': True,
                'accessToken': str(access),
                'refreshToken': str(refresh),
                'user': {
                    'name': user.name,
                    'phone': user.phone,
                    'username': user.username,
                    'email': user.email,
                },
            }, status=status.HTTP_200_OK)
        return Response({
            'success': False,
            'message': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class GetMeView(APIView):
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
