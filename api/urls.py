from django.conf.urls import url, include
from api import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter



router = DefaultRouter()
router.register(r'users', views.UsersViewSet)



# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

urlpatterns = [
    url(r'^', include(router.urls))
]

