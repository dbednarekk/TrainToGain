from django.db import models


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
    createdBy = models.CharField(max_length=50)


class Workout(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=100, blank=True, null=True)
    exercises = models.ManyToManyField(
        'Exercise', through='ExerciseDetails', blank=True)
    createdBy = models.CharField(max_length=50, blank=True, null=True)


class ExerciseDetails(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    number_of_sets = models.PositiveIntegerField(blank=True, null=True)
    number_of_reps = models.PositiveIntegerField(blank=True, null=True)
    weight = models.PositiveIntegerField(blank=True, null=True)
