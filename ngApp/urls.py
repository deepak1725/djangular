
from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from ngApp.views import AppPageView



app_name = 'app'


urlpatterns = [
    url(r'^$', AppPageView.as_view(), name="app_index"),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)