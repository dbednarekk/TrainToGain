from django.contrib import admin

from .models import Exercise, Workout, ExerciseDetails

# Register your models here.
admin.site.register(Workout)
admin.site.register(Exercise)
admin.site.register(ExerciseDetails)
