from django.contrib import admin

from .models import Exercise, Workout, WorkoutDetails


# Register your models here.
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "muscle_type", "description"]


class WorkoutDetailsInline(admin.TabularInline):
    model = WorkoutDetails


@admin.display()
def number_of_exercises(obj):
    return f"{obj.details.all().count()}"


class WorkoutAdmin(admin.ModelAdmin):
    inlines = [
        WorkoutDetailsInline
    ]
    # exclude = ["createdBy"]
    list_display = ["id", "name", "description", number_of_exercises]


class WorkoutDetailsAdmin(admin.ModelAdmin):
    pass


admin.site.register(Workout, WorkoutAdmin)
admin.site.register(Exercise, ExerciseAdmin)
admin.site.register(WorkoutDetails)
