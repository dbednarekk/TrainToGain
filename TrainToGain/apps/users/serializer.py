from rest_framework import serializers

from .models import Entity, UserDetails


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ["first_name", "last_name", "age", "height", "weight"]


class EntitySerializer(serializers.ModelSerializer):
    user_details = UserDetailsSerializer()

    class Meta:
        model = Entity
        fields = ['login', 'password', 'email', 'user_details']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user_details = validated_data.pop('user_details')
        user = UserDetails.objects.create(**user_details)
        entity = Entity.objects.create_user(user_details=user, **validated_data)
        return entity
