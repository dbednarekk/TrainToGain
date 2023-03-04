from re import I

from rest_framework import serializers

from .models import Entity, UserDetails


class GetUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = '__all__'


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ['first_name', 'last_name',
                  'age', 'height', 'weight', 'picture']


class UpdateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserDetails
        exclude = ['workouts', 'picture', 'fav_exercises']

    def update(self, instance, validated_data):
        UserDetails.objects.filter(
            entity__login=instance.login).update(**validated_data)
        return UserDetails.objects.get(entity__login=instance.login)


class EntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entity
        exclude = ['password']
        depth = 1


class CreateEntitySerializer(serializers.ModelSerializer):
    user_details = CreateUserSerializer()

    def create(self, validated_data):
        user_details = validated_data.pop('user_details')
        user = UserDetails.objects.create(**user_details)
        entity = Entity.objects.create_user(login=validated_data['login'], password=validated_data['password'],
                                            email=validated_data['email'], user_details=user)
        return entity

    class Meta:
        model = Entity
        fields = ['login', 'password', 'email', 'user_details']


class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=30)

    def update(self, instance, validated_data):
        instance.set_password(validated_data["password"])
        instance.save()
        return instance
