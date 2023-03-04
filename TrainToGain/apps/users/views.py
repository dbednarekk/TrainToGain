from rest_framework import generics, permissions
from rest_framework.decorators import (api_view, authentication_classes,
                                       parser_classes, permission_classes)
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .custom_exception import CustomUserException
from .models import Entity
from .permissions import IsOwner
from .serializer import (ChangePasswordSerializer, CreateEntitySerializer,
                         CreateUserSerializer, EntitySerializer,
                         UpdateUserSerializer)


class UserView(generics.RetrieveUpdateDestroyAPIView):
    """
    View responsible for handling getting, updating and deleting given user account.
    Only owner of account is allowed to use this view, to get info about specific user
    get_user_by_login method was created
    """
    queryset = Entity.objects.all().filter(is_admin=False) #TODO do I need all()? maybe filter(request.user.login)
    permission_classes = [IsOwner]
    lookup_url_kwarg = 'login'
    lookup_field = 'login'

    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            return UpdateUserSerializer
        return EntitySerializer


@api_view(['PATCH'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsOwner])
def change_user_password(request):
    """
        Endpoint that allows to change password for user.
    """
    try:

        user = Entity.objects.get(login=request.user.login)
        if not user.check_password(request.data['old_password']):
            raise CustomUserException("Old and new password does not match")

        serializer = ChangePasswordSerializer(user,
                                              data={"password": request.data["new_password"]})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=200)
    except Entity.DoesNotExist:
        raise CustomUserException("No user with given login")


class CreateUserView(generics.CreateAPIView):
    """
    View responsible for creating new user
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = CreateEntitySerializer

    def create(self, request, *args, **kwargs):
        queryset = Entity.objects.filter(login=request.data['login'])

        if queryset.exists():
            raise CustomUserException("Given login is already in use")
        serializer = CreateEntitySerializer(data=self.request.data)
        self.perform_save(serializer)
        # TODO change response data
        return Response(queryset.get().id, status=201)

    def perform_save(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save(**self.request.data)


@api_view(['PATCH'])
def upload_image(request, pk: int):
    """
    Endpoint used for uploading user avatar image
    """
    try:
        user = Entity.objects.get(pk=pk)
        serializer = CreateUserSerializer(
            user.user_details, data={'picture': request.data['picture']}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
    except Entity.DoesNotExist:
        raise CustomUserException("No account with given id")
    return Response(status=201, data={'Upload image successfully'})
