from django.contrib import admin

from .models import Exercise, Workout

# Register your models here.
admin.site.register(Workout)
admin.site.register(Exercise)
