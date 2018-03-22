import datetime
from django.db import models
from django.utils import timezone
from django.core.validators import validate_email
from django.contrib.auth.models import User
import uuid


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.question_text

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)


class UserChatRecords(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.OneToOneField(User, unique=True)
    created = models.DateTimeField(auto_created=True, auto_now=True)
    modified = models.DateTimeField(auto_created=True, auto_now_add=True)

    def __str__(self):
        return self.user.first_name





class FriendChannels(models.Model):
    user = models.ForeignKey(User)
    channel = models.CharField(max_length=50)
    created = models.DateTimeField(auto_created=True, auto_now=True)
    modified = models.DateTimeField(auto_created=True, auto_now_add=True)

    def __str__(self):
        return self.channel


class UserChannels(models.Model):
    user = models.ForeignKey(User, related_name='UserChannel')
    friend = models.ManyToManyField(FriendChannels, related_name='FriendChannel')
    created = models.DateTimeField(auto_created=True, auto_now_add=True)
    modified = models.DateTimeField(auto_created=True, auto_now=True)

    def __str__(self):
        return self.user.first_name


class GroupUsers(models.Model):
    user = models.ForeignKey(User)
    isAdmin = models.BooleanField()


class AllChannels(models.Model):
    channel = models.CharField(max_length=50)
    users = models.ManyToManyField(GroupUsers, related_name='Users')
    isPrivate = models.BooleanField()
    created = models.DateTimeField(auto_created=True, auto_now=True)
    modified = models.DateTimeField(auto_created=True, auto_now_add=True)
    displayName = models.CharField(max_length=50)
    createdBy = models.ForeignKey(User)

    def __str__(self):
        return self.channel
