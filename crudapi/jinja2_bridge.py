from __future__ import absolute_import  # Python 2 only

from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import reverse
from jinja2 import Environment, PackageLoader, select_autoescape
import jinja2

def environment(**options):
    env = jinja2.Environment(
        loader = PackageLoader('users', 'templates'),
        extensions=['jinja2.ext.autoescape'],
        autoescape=True,
        # variable_start_string = '{[',
        # variable_end_string = '}]'
    )

    env.globals.update({
        'static': staticfiles_storage.url,
        'url': reverse,
    })
    return env