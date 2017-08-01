from django import forms
from django.forms import ModelForm
from django.core.validators import EmailValidator, MinLengthValidator, MaxLengthValidator
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm, SetPasswordForm
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth import get_user_model,password_validation
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes


class SignupForm(ModelForm):
    first_name = forms.CharField(widget=forms.TextInput(attrs=
                                    {'class': 'form-control', 'title': 'First Name', 'placeholder': 'First Name'}),
                            max_length=100, required=True,
                            validators=[MinLengthValidator(5,'Name should be more than 3 characters long'), MaxLengthValidator(30)],
                            label=False,
                        )
    last_name = forms.CharField(widget=forms.TextInput(attrs=
                                    {'class': 'form-control', 'title': 'Last Name', 'placeholder': 'Last Name'}),
                            max_length=100, required=True,
                            validators=[MinLengthValidator(5,'Name should be more than 3 characters long'), MaxLengthValidator(30)],
                            label=False,
                        )
    password = forms.CharField(widget=forms.PasswordInput(attrs=
                                {'class': 'form-control', 'title': 'Enter your password', 'placeholder': 'Password'}),
                            max_length=100, required=True,
                            validators=[MinLengthValidator(5), MaxLengthValidator(30)],
                            label=False,
                        )

    username = forms.CharField(widget=forms.TextInput(attrs=
                                {'class': 'form-control', 'title': 'Enter Username', 'placeholder': 'Username'}),
                             max_length=50, min_length=3,required=True,
                             validators=[MinLengthValidator(3,'Username should be more than 3 Characters long')],
                             label=False
                             )
    email = forms.EmailField(widget=forms.EmailInput(attrs=
                                {'class': 'form-control', 'title': 'Enter Email', 'placeholder': 'Email'}),
                             max_length=50, min_length=3,required=True,
                             validators=[EmailValidator, MinLengthValidator(3,'Email should be more than 3 Characters long')],
                             label=False
                             )

    class Meta:
        model = User
        fields = ('first_name','last_name','username','password', 'email')
        error_messages = {
            'name': {
                'min_length': _("This writer's name is too short."),
            },
        }

    def clean_name(self):
        name = self.cleaned_data['name']
        return name

    def save(self,commit=True):
        user_obj = super(ModelForm,self).save(commit=False)
        if commit:
            user_obj.save()
            user_obj.set_password(self.cleaned_data['password'])
            user_obj.save()
            return user_obj


class LoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs=
                                {'class': 'form-control', 'title': 'Enter username','placeholder': 'Username'}),
                                max_length=50, min_length=3, required=True,
                                validators=[MinLengthValidator(3)],
                                label=False
                                )
    password = forms.CharField(widget=forms.PasswordInput(attrs=
                                {'class': 'form-control', 'title': 'Enter your password','placeholder': 'Password'}),
                               max_length=100, required=True,
                               validators=[MinLengthValidator(5), MaxLengthValidator(30)],
                               label=False,
                               )

    error_messages = {
        'invalid_login': _(
            "Please enter a correct %(username)s and password."
        ),
        'inactive': _("This account is inactive."),
    }

UserModel = get_user_model()

class MyForgotPasswordForm(PasswordResetForm):
    email = forms.EmailField(widget=forms.EmailInput(attrs=
                                {'class': 'form-control', 'title': 'Enter Email', 'placeholder': 'Email'}),
                             max_length=50, label=False, required=True,
                             )

class MySetPasswordForm(SetPasswordForm):
    new_password1 = forms.CharField(
        label=_("New password"),
        widget=forms.PasswordInput({'class': 'form-control', 'placeholder' : 'New Password'}),
        strip=False,
        help_text=password_validation.password_validators_help_text_html(),
    )
    new_password2 = forms.CharField(
        label=_("New password confirmation"),
        strip=False,
        widget=forms.PasswordInput({'class': 'form-control', 'placeholder' : 'Confirm Password'}),
    )
