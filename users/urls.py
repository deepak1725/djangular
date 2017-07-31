from django.conf.urls import url
from users import views
from users.views import MyPasswordResetConfirm, MyPasswordResetDone
from django.contrib.auth.views import LogoutView
from django.conf.urls import include,url
app_name = 'users'

urlpatterns = [
    url(r'^$', views.HomePageView.as_view(), name='index'),
    url(r'^index/$', views.HomePageView.as_view()),
    url(r'^register/$', views.RegisterView.as_view(), name='register'),
    url(r'^login/$', views.MyLogin.as_view(), name='login'),


    url(r'^forgot-password/$', views.MyPasswordReset.as_view(), name='forgot'),
    url(r'^forgot-reset-done/$', views.MyPasswordResetDone.as_view(), name='password_reset_done'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z]+)/(?P<token>.+)/$', MyPasswordResetConfirm.as_view(),
        name='password_reset_confirm'),
    url(r'^reset/done/$', views.MyPasswordResetComplete.as_view(), name='password_reset_complete'),



    url(r'^logout/$', LogoutView.as_view(), name='logout'),
]