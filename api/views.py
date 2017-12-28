from django.contrib.auth.models import User
from api.serializers import ChatRecordsSerializer, UserChannelsSerializer
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from rest_framework import status
from django.http import HttpResponse
from users.models import UserChatRecords,UserChannels
from django.shortcuts import get_object_or_404


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

    # def list(self, request, *args, **kwargs):
    #     userChatObj = UserChannels.objects.filter(user_id = 1).first()
    #     print (userChatObj)
    #     return HttpResponse(request.user)

    # def retrieve(self, request, *args, **kwargs):
    #     # pk --> userId
    #     userId = request.user.id
    #     # print userId
    #
    #     userChatObj = UserChannels.objects.filter(user_id = userId).all()
    #     self.queryset = userChatObj
    #     print (userChatObj)
    #     serializer = UserChannelsSerializer(userChatObj)
    #     return Response(serializer.data)

    # def retrieve(self, request, *args, **kwargs):
    #     userId = request.user.id
    #     instance = UserChannels.objects.get(user_id = userId)
    #     serializer = self.get_serializer(instance)
    #     print serializer
    #     return Response(serializer.data)