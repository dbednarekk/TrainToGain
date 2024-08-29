import uuid

from django.contrib.auth.base_user import AbstractBaseUser
from django.core.validators import RegexValidator, EmailValidator, MinValueValidator, MaxValueValidator
from django.db import models

from TrainToGain.apps.users.constants import MIN_NUMER_VALUE, MAX_HEIGHT_NUMBER, MAX_WEIGHT_NUMBER, MAX_AGE_NUMBER
from TrainToGain.apps.users.managers import CustomEntityManager
from TrainToGain.apps.users.regex_validators import LoginRegex, PasswordRegex, NameRegex


class Entity(AbstractBaseUser):
    """Base model for every user"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    login = models.CharField(max_length=50, unique=True, blank=False, null=False,
                             validators=[RegexValidator(regex=LoginRegex.regex, message=LoginRegex.message)])
    password = models.CharField(blank=False, null=False,
                                validators=[RegexValidator(regex=PasswordRegex.regex, message=PasswordRegex.message)])
    email = models.EmailField(max_length=50, unique=True, blank=False, null=False,
                              validators=[EmailValidator(message="Invalid email")])
    active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    # Properties for compatibility with django admin
    @property
    def is_staff(self):
        return self.is_admin

    @property
    def is_active(self):
        return self.active

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

    user_details = models.OneToOneField(
        'UserDetails', on_delete=models.CASCADE, null=True, blank=True)

    objects = CustomEntityManager()
    USERNAME_FIELD = 'login'
    REQUIRED_FIELDS = ['password', 'email']


class UserDetails(models.Model):
    """Model for additional user information"""
    first_name = models.CharField(max_length=50, blank=False, null=False,
                                  validators=[RegexValidator(regex=NameRegex.regex, message=NameRegex.message)])
    last_name = models.CharField(max_length=50, blank=False, null=False,
                                 validators=[RegexValidator(regex=NameRegex.regex, message=NameRegex.message)])
    age = models.PositiveIntegerField(blank=True, null=True, validators=[
        MinValueValidator(limit_value=MIN_NUMER_VALUE, message=f"Value must be greater than {MIN_NUMER_VALUE}"),
        MaxValueValidator(limit_value=MAX_AGE_NUMBER, message=f"Value must be less than {MAX_AGE_NUMBER}")])
    height = models.PositiveIntegerField(blank=True, null=True, validators=[
        MinValueValidator(limit_value=MIN_NUMER_VALUE, message=f"Value must be greater than {MIN_NUMER_VALUE}"),
        MaxValueValidator(limit_value=MAX_HEIGHT_NUMBER, message=f"Value must be less than {MAX_HEIGHT_NUMBER}")])
    weight = models.PositiveIntegerField(blank=True, null=True, validators=[
        MinValueValidator(limit_value=MIN_NUMER_VALUE, message=f"Value must be greater than {MIN_NUMER_VALUE}"),
        MaxValueValidator(limit_value=MAX_WEIGHT_NUMBER, message=f"Value must be less than {MAX_HEIGHT_NUMBER}")])
    picture = models.ImageField(upload_to='avatars/', blank=True, null=True)
