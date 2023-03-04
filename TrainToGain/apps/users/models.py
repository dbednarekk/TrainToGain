from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.core.validators import EmailValidator, RegexValidator
from django.db import models

from ..workouts.models import Exercise, Workout


class CustomEntityManager(BaseUserManager):
    def create_user(self, login, password, email, user_details):
        user = self.model(login=login, email=email, user_details=user_details)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, login, password, email, user_details):
        admin = self.model(login=login, email=email, user_details=user_details)
        admin.set_password(password)
        admin.is_admin = True
        admin.save(using=self._db)
        return admin


class Entity(AbstractBaseUser):
    login = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=30, validators=[RegexValidator(
        regex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W).{8,}$")])
    email = models.EmailField(max_length=30, unique=True)
    active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    user_details = models.OneToOneField(
        'UserDetails', on_delete=models.CASCADE, null=True, blank=True)
    objects = CustomEntityManager()
    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['password', 'email', 'user_details']


class UserDetails(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=40)
    age = models.PositiveIntegerField(blank=True, null=True)
    height = models.PositiveIntegerField(blank=True, null=True)
    weight = models.PositiveIntegerField(blank=True, null=True)
    workouts = models.ManyToManyField('workouts.Workout', blank=True)
    fav_exercises = models.ManyToManyField('workouts.Exercise', blank=True)
    picture = models.ImageField(upload_to='avatars/', blank=True, null=True)
