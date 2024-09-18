from django.contrib import admin
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.forms import AuthenticationForm

UserModel = get_user_model()


class CustomAdminLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def clean(self):
        username = self.cleaned_data.get("username")
        password = self.cleaned_data.get("password")

        if username is not None and password:
            try:
                user_db = UserModel.objects.get(phone=username)
                self.user_cache = authenticate(
                    self.request, username=username, password=password + user_db.salt
                )
            except UserModel.DoesNotExist:
                self.user_cache = None
            if self.user_cache is None:
                raise self.get_invalid_login_error()
            else:
                self.confirm_login_allowed(self.user_cache)

        return self.cleaned_data


admin.site.login_form = CustomAdminLoginForm
