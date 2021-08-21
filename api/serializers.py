from django.contrib.auth import get_user_model
from rest_framework import serializers
# from views import
UserModel = get_user_model()
from allauth.account.utils import setup_user_email
from rest_auth.registration.serializers import RegisterSerializer
from rest_auth.serializers import PasswordResetSerializer
from ngApp.forms import MyPasswordResetForm
from users.models import UserChatRecords, UserChannels, FriendChannels, AllChannels, GroupUsers

class MyRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    def get_cleaned_data(self):
        super(MyRegisterSerializer, self).get_cleaned_data()
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', '')
        }



class ResetPasswordSerializer(PasswordResetSerializer):
    password_reset_form_class = MyPasswordResetForm



class ChatRecordsSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserChatRecords
        fields = ('user','uuid', 'created', 'modified')

#




class FriendField(serializers.ModelSerializer):
    first_name = serializers.CharField(read_only=True, source='user.first_name')
    username = serializers.CharField(read_only=True, source='user.username')
    last_name = serializers.CharField(read_only=True, source='user.last_name')

    class Meta:
        model = FriendChannels
        fields = ('user', 'channel', 'first_name', 'last_name', 'username')


class UserChannelsSerializer(serializers.ModelSerializer):
    friend = FriendField(many=True)
    first_name = serializers.CharField(read_only=True, source='user.first_name')
    username = serializers.CharField(read_only=True, source='user.username')
    last_name = serializers.CharField(read_only=True, source='user.last_name')

    class Meta:
        model = UserChannels
        fields = ('user', 'friend', 'first_name', 'last_name', 'username')

    def create(self, validated_data):
        friends = validated_data.pop('friend')
        uc = UserChannels.objects.filter(user_id=validated_data['user'].id)
        if (uc.exists()):
            uc = uc.first()
        else:
            uc = UserChannels.objects.create(**validated_data)

        for friend_data in friends:
            # Add Friend as User If not exists
            friendUser = UserChannels.objects.filter(user=friend_data['user']).first()
            if not friendUser:
                friendUser = UserChannels.objects.create(user=friend_data['user'])


            # Add User as Friend of New Friend
            if not friendUser.friend.filter(user=validated_data['user']).exists():
                newFriend = friendUser.friend.get_or_create(
                    user=validated_data['user'],
                    channel=friend_data['channel']
                )
                friendUser.friend.add(newFriend[0])



            if not uc.friend.filter(user=friend_data['user']).exists():
                uc.friend.add(FriendChannels.objects.create(**friend_data))

        return uc



class GroupUserField(serializers.ModelSerializer):
    first_name = serializers.CharField(read_only=True, source="user.first_name")
    last_name = serializers.CharField(read_only=True, source="user.last_name")
    username = serializers.CharField(read_only=True, source="user.username")
    isAdmin = serializers.BooleanField(default=False)

    class Meta:
        model = GroupUsers
        fields = ('user','isAdmin', 'first_name', 'last_name', 'username')


class AllChannelSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(read_only=True, source='createdBy.user.first_name')
    username = serializers.CharField(read_only=True, source='createdBy.user.username')
    last_name = serializers.CharField(read_only=True, source='createdBy.user.last_name')
    users = GroupUserField(many=True)


    class Meta:
        model = AllChannels
        fields = '__all__'

    def create(self, validated_data):
        users = validated_data.pop('users')
        instanceAllChannels = AllChannels.objects.filter(channel=validated_data['channel'])

        if(not instanceAllChannels.exists()):
            instanceAllChannels = AllChannels.objects.create(**validated_data)
        else:
            instanceAllChannels = instanceAllChannels.first()

        for user_data in users:
            gc = instanceAllChannels.users.filter(user=user_data['user'])
            if gc.exists():
                gc = gc.first()
            else:
                gc = GroupUsers.objects.create(**user_data)
            instanceAllChannels.users.add(gc)
        return instanceAllChannels

    def update(self, instance, validated_data):
        users = validated_data.pop('users')
        instance.displayName = validated_data['displayName']
        instance.isPrivate = validated_data['isPrivate']
        instance.save()

        for user_data in users:
            gc = instance.users.filter(user=user_data['user'])

            if gc.exists():
                gc = gc.first()
            else:
                gc = GroupUsers.objects.create(**user_data)

            gc.isAdmin = user_data['isAdmin']
            gc.save()
            instance.users.add(gc)

        return instance