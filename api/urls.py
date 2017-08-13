from django.conf.urls import url, include
from api import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter
from users.views import MyPasswordResetConfirm
from rest_framework_jwt.views import obtain_jwt_token
from rest_auth.views import (
    LoginView, LogoutView, UserDetailsView, PasswordChangeView,
    PasswordResetView, PasswordResetConfirmView
)
from rest_auth.registration.views import RegisterView, VerifyEmailView
from django.views.generic import TemplateView



router = DefaultRouter()
router.register(r'users', views.UsersViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^rest-auth/auth/', include('rest_auth.registration.urls')),
]


    # Auth URLs
urlpatterns += [

    url(r'^register', RegisterView.as_view(), name='register'),
    url(r'^verify-email', VerifyEmailView.as_view(), name='verify_email'),
    url(r'^login', LoginView.as_view(), name='login'),
    url(r'^logout', LogoutView.as_view(), name='logout'),

    # Password Reset
    url(r'^reset-password', PasswordResetView.as_view(), name='resetPassword'),

    # Password Reset Confirm
    #TODO BRING Back reset password serializer link here|
    # (from ngApp using custom my PASSWORD_RESET_SERIALIZER).
    # url(r'^reset/(?P<uidb64>[0-9A-Za-z]+)/(?P<token>.+)/$', PasswordResetConfirmView.as_view(),
    #     name='password_reset_confirm'),

    # Change Password
    url(r'^change-password', PasswordChangeView.as_view(), name='change_password'),
    url(r'^account-confirm-email/(?P<key>[-:\w]+)/$', TemplateView.as_view(),
        name='account_confirm_email'),

]
