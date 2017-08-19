
from django.conf.urls import url, include
from ngApp.views import AppPageView

app_name = 'app'


urlpatterns = [

        # This is used with Custom Password Serializer
                #User During Password Reset for Sending Email(return URL)
        url(r'^reset/(?P<uidb64>[0-9A-Za-z]+)/(?P<token>.+)/$', AppPageView.as_view(),
        name='password_reset_confirm'),

        url(r'^', AppPageView.as_view(), name="app_index"),

]