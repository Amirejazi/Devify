from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from ..manager import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255, verbose_name='نام و نام خانوادگی')
    phone = models.CharField(max_length=200, unique=True, verbose_name='شماره موبایل')
    username = models.CharField(max_length=150, unique=True, verbose_name='نام کاربری')
    email = models.EmailField(max_length=200, unique=True, blank=True, null=True, verbose_name='ایمیل')
    phone_activate_code = models.CharField(max_length=50, blank=True, null=True, verbose_name='کد فعال سازی موبایل')
    is_active = models.BooleanField(default=False, verbose_name='کاربر فعال / غیر فعال')
    is_email_verified = models.BooleanField(default=False, verbose_name='ایمیل تایید شده / نشده')
    avatar = models.ImageField(upload_to='images/users/', null=True, blank=True, verbose_name='آواتار')
    register_date = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ثبت نام')
    last_update = models.DateTimeField(auto_now=True, verbose_name='تاریخ آخرین تغییرات')
    salt = models.CharField(max_length=50, unique=True, verbose_name='salt')
    is_admin = models.BooleanField(default=False, verbose_name='مدیر')
    is_superuser = models.BooleanField(default=False, verbose_name='مدیرکل')

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ('name', 'username', 'email')

    objects = CustomUserManager()

    def __str__(self):
        return self.name

    @property
    def is_staff(self):
        return self.is_admin

    class Meta:
        indexes = [
            models.Index(fields=['register_date']),
            models.Index(fields=['phone']),
        ]
        verbose_name = 'کاربر'
        verbose_name_plural = 'کاربران'
        db_table = "t_users"
