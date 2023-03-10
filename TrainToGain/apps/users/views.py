from rest_framework import viewsets
from rest_framework.response import Response

from TrainToGain.apps.users.models import Entity
from TrainToGain.apps.users.serializer import EntitySerializer, UserDetailsSerializer


class UserViewSet(viewsets.ModelViewSet):
    """View for user CRUD operations"""

    lookup_url_kwarg = "login"
    lookup_field = "login"
    serializer_class = EntitySerializer

    def get_queryset(self):
        return Entity.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object().user_details
        serializer = UserDetailsSerializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
