from __future__ import unicode_literals
from django.views import generic
from django.shortcuts import render, HttpResponse
from django.conf import settings



class AppPageView(generic.TemplateView):
    template_name = "ngApp/index.html"