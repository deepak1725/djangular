

from django.contrib import admin
from django.conf.urls import include,url
from django.conf import settings
from users.views import MyPasswordResetConfirm
from rest_auth.registration.views import VerifyEmailView
from rest_auth.views import PasswordResetConfirmView
# from ngApp.views import ResetPasswordConfirm
from django.conf.urls.static import static


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('api.urls', namespace='api')),
    url(r'^app/', include('ngApp.urls', namespace='app')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # AUTH

    #Used in Signup
    url(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(),
    name='account_confirm_email'),


    url(r'^', include('users.urls', namespace='users')),

]

# if settings.DEBUG:
#     import debug_toolbar
#     urlpatterns = [
#         url(r'^__debug__/', include(debug_toolbar.urls)),
#     ] + urlpatterns

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)