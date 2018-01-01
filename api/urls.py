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
router.register(r'chat', views.UsersChatRecoredsViewSet)
router.register(r'user-channels', views.UserChannelsViewSet)

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
    #POST NEW PASSWORD HERE
    url(r'^reset/password/confirm', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    # Change Password
    url(r'^change-password', PasswordChangeView.as_view(), name='change_password'),
    url(r'^account-confirm-email/(?P<key>[-:\w]+)/$', TemplateView.as_view(),
        name='account_confirm_email'),

    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^channel-name/', views.GetChannelNameViewSet.as_view(), name='channel-name'),
    url(r'^user-details/', views.UserDetailsViewSet.as_view(), name='user-details'),

]
