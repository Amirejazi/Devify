from django.contrib.auth import get_user_model
from ...main.models import BaseModel
from django.db import models

User = get_user_model()


class BlockedUser(BaseModel):
    user = models.OneToOneField(User, db_index=True, on_delete=models.CASCADE, verbose_name='کاربر بلاک شده')
    reason = models.CharField(max_length=255, blank=True, null=True, verbose_name='دلیل بلاک')

    def __str__(self):
        return f'{self.user.name} کاربر بلاک شده '

    class Meta:
        verbose_name = 'کاربر بلاک شده'
        verbose_name_plural = 'کاربران بلاک شده'
        db_table = "t_blocked_users"
