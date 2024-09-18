from datetime import datetime

from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, phone, name, username, password, email=None, phone_activate_code=None, is_active=False):
        if not phone:
            raise ValueError("شماره موبایل را وارد کنید!")

        if not name:
            raise ValueError("لطفا نام را وارد کنید!")

        salt = hex(int((datetime.now() - datetime(2001, 1, 1)).total_seconds()))

        user = self.model(
            phone=phone,
            name=name,
            phone_activate_code=phone_activate_code,
            username=username,
            salt=salt,
            is_active=is_active
        )
        if email:
            user.email = self.normalize_email(email)

        user.set_password(password + salt)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone, name, username, email=None, password=None, phone_activate_code=None):
        user = self.create_user(
            phone=phone,
            email=email,
            name=name,
            phone_activate_code=phone_activate_code,
            password=password,
            username=username
        )
        user.is_admin = True
        user.is_active = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
