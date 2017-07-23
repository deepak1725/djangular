from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.urls import reverse
from django.views import generic
from .models import Choice, Question, Users
from .forms import SignupForm, LoginForm, ForgotPassword
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from django.core.urlresolvers import reverse_lazy
from django.contrib.auth import login
from django.contrib.auth.views import LoginView,PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
from django.contrib.sessions.models import Session
from django.contrib import messages
from django.shortcuts import resolve_url
from django.conf import settings
from django.contrib.auth.mixins import LoginRequiredMixin


class HomePageView(LoginRequiredMixin,generic.TemplateView):
    template_name = 'users/index.html'
    context_object_name = 'latest_question_list'
    def get_context_data(self, **kwargs):
        self.request.session['foo'] = 'xbar'
        context = super(HomePageView, self).get_context_data(**kwargs)
        context['latest_articles'] = Users.objects.all()[:5]
        return context


class RegisterView(generic.CreateView):
    model = User
    success_url = reverse_lazy('users:index')
    form_class = SignupForm
    template_name = 'users/register.html'


class MyLogin(LoginView):
    authentication_form = LoginForm
    template_name = 'users/login.html'
    redirect_authenticated_user = True
    def get_success_url(self):
        url = self.get_redirect_url()
        messages.success(self.request, 'Successfully logged in',extra_tags='alert-success')
        return url or resolve_url(settings.LOGIN_REDIRECT_URL)


class MyPasswordReset(PasswordResetView):
    form_class = ForgotPassword
    from_email = 'admin@crud.com'
    email_template_name = 'email/forgot_password.html'
    success_url = reverse_lazy('users:password_reset_done')


class MyPasswordResetDone(PasswordResetDoneView):
    template_name = 'registration/password_reset_done.html'


class MyPasswordResetConfirm(PasswordResetConfirmView):
    success_url = reverse_lazy('users: password_reset_complete')
    template_name = 'registration/password_reset_confirm.html'



