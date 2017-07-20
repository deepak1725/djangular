from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework import serializers
from django.http import HttpResponse

# User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['email'],
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ['username', 'password','first_name', 'last_name', 'email' ]


class PasswordSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
