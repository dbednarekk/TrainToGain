from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Permission that checks if user is owner of workout or exercise and can modify it
    or is not owner and can only read
    """

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user.login == obj.createdBy:
            return True
        return False
