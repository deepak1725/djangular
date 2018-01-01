from django.contrib.auth.models import User
from api.serializers import ChatRecordsSerializer, UserChannelsSerializer
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from rest_framework import status
from django.http import HttpResponse
from users.models import UserChatRecords,UserChannels, FriendChannels
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
import random, string


class UsersChatRecoredsViewSet(viewsets.ModelViewSet):
    permission_classes = ''
    authentication_classes = ''
    queryset = UserChatRecords.objects.all()
    serializer_class = ChatRecordsSerializer

    def retrieve(self, request, *args, **kwargs):
        # pk --> userId
        userId = kwargs['pk']
        userChatObj = UserChatRecords.objects.filter(user = userId).first()
        serializer = ChatRecordsSerializer(userChatObj)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        userId = request.data['user']
        user = UserChatRecords.objects.filter(user=userId).first()

        if (user):
            serializer = ChatRecordsSerializer(user)
            return Response(serializer.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class UserChannelsViewSet(viewsets.ModelViewSet):
    queryset = UserChannels.objects.all()
    serializer_class = UserChannelsSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = UserChannels.objects.filter(user_id=kwargs['pk']).first()
        serializer = self.get_serializer(instance)
        message = 'Data Successfully fetched'
        if not serializer.data['user']:
            message = "No User Found"
        responseData = {
            'message' : message,
            'data': serializer.data,
            'error' : None
        }
        return Response(responseData,  status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        response = super(UserChannelsViewSet, self).create(request, args, kwargs)
        message = 'Channel Successfully created'

        responseData = {
            'message': message,
            'data': response.data,
            'error': None
        }
        return Response(responseData, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        response = super(UserChannelsViewSet, self).list(request, args, kwargs)
        message = 'Data Successfully fetched'

        responseData = {
            'message': message,
            'data': response.data,
            'error': None
        }
        return Response(responseData, status=status.HTTP_200_OK)



class GetChannelNameViewSet(APIView):

    def get(self, request, *args, **kw):

        condition = True
        result=None

        while condition:
            result = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            condition = FriendChannels.objects.filter(channel=result).exists()

        responseData = {
            'message': 'Channel Name Successfully Created.',
            'data': {'name':result},
            'error': None
        }
        return Response(responseData, status=status.HTTP_200_OK)
