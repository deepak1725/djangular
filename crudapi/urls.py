

from django.contrib import admin
from django.conf.urls import include,url
from django.conf import settings
from rest_auth.registration.views import VerifyEmailView
from django.conf.urls.static import static
from django.views.generic import RedirectView


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('api.urls', namespace='api')),
    url(r'^app/', include('ngApp.urls', namespace='app')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # AUTH

    #Used in Signup
    url(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(),
    name='account_confirm_email'),


    url(r'^$', RedirectView.as_view(url = '/app/', permanent=True) ),

]

# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns = [
#         url(r'^__debug__/', include(debug_toolbar.urls)),
#     ] + urlpatterns

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)