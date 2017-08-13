from django.contrib.auth import get_user_model
from rest_framework import serializers

UserModel = get_user_model()
from allauth.account.utils import setup_user_email
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import PasswordResetSerializer
from ngApp.forms import MyPasswordResetForm



class UserSerializer(RegisterSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)

    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password1 = password2 = password


    def validate(self, data):
        # This Checks data['password1'] with password2 , hence raises key error
        return data

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password': self.validated_data.get('password', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', '')
        }



class ResetPasswordSerializer(PasswordResetSerializer):
    password_reset_form_class = MyPasswordResetForm

