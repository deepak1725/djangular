from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views import generic
from .models import Choice, Question, Users


class HomePageView(generic.TemplateView):
    template_name = 'crud/index.html'
    context_object_name = 'latest_question_list'

    def get_context_data(self, **kwargs):
        context = super(HomePageView, self).get_context_data(**kwargs)
        context['latest_articles'] = Users.objects.all()[:5]
        return context


class Register(generic.TemplateView):
    model = Users
    template_name = 'crud/register.html'


class LoginView(generic.ListView):
    model = Question
    template_name = 'crud/login.html'
