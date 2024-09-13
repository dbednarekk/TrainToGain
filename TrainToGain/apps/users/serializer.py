from django.core.validators import RegexValidator
from rest_framework import serializers

from .models import Entity, UserDetails
from .regex_validators import PasswordRegex


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ["first_name", "last_name", "age", "height", "weight", "picture"]


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


class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        validators=[RegexValidator(regex=PasswordRegex.regex, message=PasswordRegex.message)])
    confirm_password = serializers.CharField()

    def validate(self, data):
        if data.get("password") != data.get("confirm_password"):
            raise serializers.ValidationError("Passwords does not match.")
        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data.get("password"))
        instance.save()
        return instance

    def to_representation(self, instance):
        return {"message": "Password changed successfully."}
