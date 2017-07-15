import datetime
from django.db import models
from django.utils import timezone
from django.core.validators import validate_email


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.question_text

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text

class Users(models.Model):
    id = models.IntegerField(primary_key=True, auto_created=True)
    name = models.CharField(max_length=255, blank = False, null=False)
    email = models.EmailField(max_length=250, blank = False, null=False, validators=[validate_email])
    created = models.DateTimeField(auto_created=True)
    modified = models.DateTimeField(auto_now=True)