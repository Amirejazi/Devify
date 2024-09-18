import re

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from apps.account.models import BlockedUser
from apps.account.utils import generate_otp

User = get_user_model()


class RegistrationSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(max_length=12, write_only=True)
    confirmPassword = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        model = User
        fields = ['name', 'phone', 'username', "email", "password", "confirmPassword"]

    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.get('confirmPassword')
        phone = attrs.get('phone')

        try:
            user = User.objects.get(phone=phone)
            if BlockedUser.objects.filter(user=user).exists():
                raise serializers.ValidationError({"message": "This user is blocked"})
            if user.is_active:
                raise serializers.ValidationError({"phone": "This phone number is already registered."})
            else:
                pass
        except User.DoesNotExist:
            pass

        if password and confirm_password and password != confirm_password:
            raise serializers.ValidationError({"detail": "passwords doesnt match"})

        # try:
        #     validate_password(password)
        # except exceptions.ValidationError as e:
        #     raise serializers.ValidationError({"password": list(e.messages)})

        return super().validate(attrs)

    def create(self, validated_data):
        user = User.objects.create_user(
            name=validated_data['name'],
            phone=validated_data['phone'],
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            phone_activate_code=generate_otp(),
            is_active=True
        )
        return user


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField(max_length=20, required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        identifier = data.get('identifier').strip()
        password = data.get('password').strip()

        if identifier and password:
            try:
                email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
                if re.match(email_regex, identifier):
                    user = User.objects.get(email=identifier)
                else:
                    user = User.objects.get(username=identifier)
                if not user.is_active:
                    msg = 'حساب کاربری شما فعال نمی باشد!'
                    raise serializers.ValidationError(msg)
                if not check_password(password + user.salt, user.password):
                    msg = 'اطلاعات وارد شده اشتباه می باشد!'
                    raise serializers.ValidationError(msg)
                if BlockedUser.objects.filter(user=user).exists():
                    msg = 'حساب کاربری شما بلاک شده است!'
                    raise serializers.ValidationError(msg)
            except User.DoesNotExist:
                msg = 'اطلاعات وارد شده اشتباه می باشد!'
                raise serializers.ValidationError(msg)
        else:
            msg = 'mobile_number و password نمیتوانند خالی باشند!'
            raise serializers.ValidationError(msg)

        data['user'] = user
        return data

    @classmethod
    def get_token(cls, user):
        refresh = RefreshToken.for_user(user)
        return refresh


class CreatorSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'username', 'phone', 'avatar']