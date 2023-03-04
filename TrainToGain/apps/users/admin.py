from django.contrib import admin
from django.contrib.auth.models import Group

from .models import Entity

# Register your models here.
admin.site.register(Entity)
admin.site.unregister(Group)
