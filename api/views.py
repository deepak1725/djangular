from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from serializers import UserSerializer, PasswordSerializer
from rest_framework.decorators import APIView
from rest_framework import generics
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from rest_framework import status
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated,DjangoObjectPermissions
from rest_framework.decorators import api_view, permission_classes



class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'GET':
            return True

class UsersViewSet(viewsets.ModelViewSet):
    # authentication_classes = [BasicAuthentication]
    permission_classes = [DjangoObjectPermissions]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request, pk=None, **kwargs):
        permission_classes = (DjangoObjectPermissions,)

        print request.user
        print request._full_data
        print "Helloooooooooooooooo"
        # permission_classes = [IsAuthenticated]
        data = request.data
        return HttpResponse("Done")

    def retrieve(self, request, pk=None, **kwargs):

        instance = self.get_object().email
        if self.get_object() == request.user:
            return HttpResponse(True)
        else:
            return HttpResponse(False)


    # @detail_route(url_path='password/(?P<number>[0-9]+)')
    # def password(self, request,pk=None, number=None):
    #     password = request.POST.get('password','')
    #     return HttpResponse("Wow! It Works")


