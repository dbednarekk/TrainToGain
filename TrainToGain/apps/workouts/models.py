from django.db import models

from TrainToGain.apps.users.models import Entity


class Exercise(models.Model):
    BODY_PARTS = [
        ('ABDOMINAL', 'Abdominal'),
        ('LOWER_BACK', 'Lower back'),
        ('UPPER_BACK', 'Upper Back'),
        ('BICEPS', 'Biceps'),
        ('TRICEPS', 'Triceps'),
        ('CHEST', 'Chest'),
        ('CALVES', 'Calves'),
        ('FOREARMS', 'Forearms'),
        ('GLUTES', 'Glutes'),
        ('HAMSTRINGS', 'Hamstrings'),
        ('LATS', 'Lats'),
        ('SHOULDERS', 'Shoulders'),
        ('TRAPS', 'Traps'),
        ('QUADRICEPS', 'Quadriceps'),
        ('FBW', 'Full body workout'),

    ]
    name = models.CharField(max_length=50, unique=True)
    muscle_type = models.CharField(max_length=20, choices=BODY_PARTS)
    description = models.CharField(max_length=200, blank=True, null=True)
    picture = models.ImageField(upload_to='exercises/', blank=True, null=True)

    def __str__(self):
        return f"{self.name} {self.id}"


class Workout(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=100, blank=True, null=True)
    exercises = models.ManyToManyField(
        'Exercise', through='WorkoutDetails', blank=True)
    duration = models.DurationField()
    createdBy = models.ForeignKey(Entity, related_name="workouts", on_delete=models.CASCADE)
    createdAt = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} {self.id}"


class WorkoutDetails(models.Model):
    workout = models.ForeignKey(Workout, related_name="details", on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, related_name="details", on_delete=models.CASCADE)
    number_of_reps = models.PositiveIntegerField(blank=True, null=True)
    weight = models.PositiveIntegerField(blank=True, null=True)
