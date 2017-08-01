from __future__ import unicode_literals
from django.views import generic
from django.shortcuts import render, HttpResponse
from django.conf import settings



class AppPageView(generic.TemplateView):
    template_name = "ngApp/index.html"

    def get_context_data(self, **kwargs):
        context = super(AppPageView, self).get_context_data(**kwargs)
        context['MEDIA_URL'] = settings.MEDIA_URL
        return context

