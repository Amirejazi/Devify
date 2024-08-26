import jdatetime as jdatetime
from django.db import models
from admin_decorators import short_description, order_field
from django.utils import timezone


class BaseModel(models.Model):
    id = models.BigAutoField(primary_key=True)
    created_date = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ثبت')
    last_updated = models.DateTimeField(auto_now=True, verbose_name='آخرین بروزرسانی')

    @short_description('تاریخ ثبت')
    @order_field('created_date')
    def get_created_date_shamsi(self):
        local_time = timezone.localtime(self.created_date)
        jdatetime_obj = jdatetime.datetime.fromgregorian(datetime=local_time, locale=jdatetime.FA_LOCALE)
        return jdatetime_obj.strftime('%A %d %B %Y ساعت %H:%M:%S')

    @short_description('آخرین بروزرسانی')
    @order_field('last_updated')
    def get_updated_date_shamsi(self):
        local_time = timezone.localtime(self.last_updated)
        jdatetime_obj = jdatetime.datetime.fromgregorian(datetime=local_time, locale=jdatetime.FA_LOCALE)
        return jdatetime_obj.strftime('%d %B %Y ساعت %H:%M:%S')

    class Meta:
        abstract = True