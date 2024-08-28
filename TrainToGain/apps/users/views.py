from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from TrainToGain.apps.users.models import Entity
from TrainToGain.apps.users.serializer import EntitySerializer, UserDetailsSerializer


class UserViewSet(viewsets.ModelViewSet):
    """View for user CRUD operations"""

    serializer_class = EntitySerializer

    def get_queryset(self):
        return Entity.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(serializer.data, status=201)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object().user_details
        serializer = UserDetailsSerializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    @action(detail=False, methods=["PATCH"], url_path="profile-image")
    def upload_profile_image(self, request, login=None):
        """Upload profile image and update user information"""
        user = self.get_object()
        serializer = UserDetailsSerializer(
            user.user_details, data={'picture': request.data['picture']}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=204)
