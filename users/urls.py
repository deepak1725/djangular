from django.conf.urls import url
from . import views
from django.contrib.auth.views import LogoutView


app_name = 'users'

urlpatterns = [
    url(r'^$', views.HomePageView.as_view(), name='index'),
    url(r'^index/$', views.HomePageView.as_view()),
    url(r'^register/$', views.RegisterView.as_view(), name='register'),
    url(r'^login/$', views.MyLogin.as_view(), name='login'),


    url(r'^forgot-password/$', views.MyPasswordReset.as_view(), name='forgot'),
    url(r'^forgot-reset-done/$', views.MyPasswordResetDone.as_view(), name='password_reset_done'),
    url(r'^^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.MyPasswordResetDone.as_view(), name='password-reset-confirm'),
    url(r'^forgot-reset-done/$', views.MyPasswordResetDone.as_view(), name='password-reset-complete'),


    url(r'^logout/$', LogoutView.as_view(), name='logout'),
]