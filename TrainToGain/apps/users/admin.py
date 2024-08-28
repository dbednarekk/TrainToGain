from django.contrib import admin

from .models import Entity


# Register your models here.

class UserAdminView(admin.ModelAdmin):
    exclude = ["password"]


admin.site.register(Entity, UserAdminView)
