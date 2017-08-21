from django.contrib.auth.forms import PasswordResetForm
from django.template import loader
from django.core.mail import EmailMultiAlternatives

from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes

class MyPasswordResetForm(PasswordResetForm):
    # Once Email is Sent, next will not triggered simultaneouly
    def save(self, **kwargs):
        return super(MyPasswordResetForm, self).save(email_template_name='account/email/password_reset_email.html')

