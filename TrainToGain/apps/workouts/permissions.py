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


class IsOwner(permissions.BasePermission):
    """
    Checks if user is owner of the object.
    """

    def has_object_permission(self, request, view, obj):
        # Terrible way of doing it
        for x in obj:
            if request.user != x.createdBy:
                return False
        return True
