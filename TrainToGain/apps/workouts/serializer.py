from rest_framework import serializers

from .models import Exercise, Workout


class GetExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise


class CreateExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'


class GetWorkoutSerializer(serializers.ModelSerializer):
    createdBy = serializers.SlugRelatedField(read_only=True, slug_field="login")

    class Meta:
        model = Workout
        fields = '__all__'
        depth = 2


class CreateWorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        exclude = ["createdBy"]
        depth = 2

    def create(self, validated_data):
        workout = Workout.objects.create(
            name=validated_data["name"],
            description=validated_data["description"],
            duration=validated_data["duration"],
            createdBy=validated_data["createdBy"].login)

        return workout
