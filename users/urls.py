from django.conf.urls import url
from . import views


app_name = 'users'

urlpatterns = [
    url(r'^$', views.HomePageView.as_view(), name='index'),
    url(r'^register/$', views.Register.as_view(), name='register'),
    url(r'^login/$', views.LoginView.as_view(), name='login'),
]