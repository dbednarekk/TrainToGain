from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Permission that checks if user is authorized to update account information
    (the account belongs to the authenticated user)
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        try:
            if request.user.login == obj.login:
                return True
        except AttributeError:
            return False
        return False
