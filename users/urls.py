from django.conf.urls import url
from . import views
from django.contrib.auth.views import LogoutView


app_name = 'users'

urlpatterns = [
    url(r'^$', views.HomePageView.as_view(), name='index'),
    url(r'^index/$', views.HomePageView.as_view()),
    url(r'^register/$', views.RegisterView.as_view(), name='register'),
    url(r'^login/$', views.MyLoginView.as_view(), name='login'),
    url(r'^logout/$', LogoutView.as_view(), name='logout'),
]