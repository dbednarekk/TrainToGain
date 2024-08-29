from django.contrib import admin

from .models import Entity, UserDetails


# Register your models here.

class UserAdminView(admin.ModelAdmin):
    exclude = ["password"]


admin.site.register(Entity, UserAdminView)
admin.site.register(UserDetails)
