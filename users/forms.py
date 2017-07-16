from django import forms
from django.forms import ModelForm
from django.core.validators import EmailValidator, MinLengthValidator, MaxLengthValidator
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm

class SignupForm(ModelForm):
    name = forms.CharField(widget=forms.TextInput(attrs=
                                    {'class': 'form-control', 'title': 'Enter your name', 'placeholder': 'Name'}),
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

    username = forms.EmailField(widget=forms.EmailInput(attrs=
                                {'class': 'form-control', 'title': 'Enter Email', 'placeholder': 'Email'}),
                             max_length=50, min_length=3,required=True,
                             validators=[EmailValidator, MinLengthValidator(3,'Email should be more than 3 Characters long')],
                             label=False
                             )

    class Meta:
        model = User
        fields = ('name','username','password')
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
    username = forms.EmailField(widget=forms.EmailInput(attrs=
                                {'class': 'form-control', 'title': 'Enter Email','placeholder': 'Email'}),
                                max_length=50, min_length=3, required=True,
                                validators=[EmailValidator],
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