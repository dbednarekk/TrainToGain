from django.contrib.auth.base_user import AbstractBaseUser
from django.core.validators import RegexValidator
from django.db import models

from TrainToGain.apps.users.managers import CustomEntityManager


class Entity(AbstractBaseUser):
    """Base model for every user"""
    login = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=50, validators=[RegexValidator(
        regex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W).{8,50}$")])
    email = models.EmailField(max_length=50, unique=True)
    active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    user_details = models.OneToOneField(
        'UserDetails', on_delete=models.CASCADE, null=True, blank=True)

    objects = CustomEntityManager()
    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['password', 'email', 'user_details']


class UserDetails(models.Model):
    """Model for additional user information"""
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.PositiveIntegerField(blank=True, null=True)
    height = models.PositiveIntegerField(blank=True, null=True)
    weight = models.PositiveIntegerField(blank=True, null=True)
    picture = models.ImageField(upload_to='avatars/', blank=True, null=True)

    workouts = models.ManyToManyField('workouts.Workout', blank=True)
    fav_exercises = models.ManyToManyField('workouts.Exercise', blank=True)
