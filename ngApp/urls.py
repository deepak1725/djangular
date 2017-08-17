
from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from ngApp.views import AppPageView
from rest_auth.views import PasswordResetConfirmView


app_name = 'app'


urlpatterns = [
        url(r'^', AppPageView.as_view(), name="app_index"),

        # This is used with Custom Password Serializer
        url(r'^reset/(?P<uidb64>[0-9A-Za-z]+)/(?P<token>.+)/$', PasswordResetConfirmView.as_view(),
          name='password_reset_confirm'),

]