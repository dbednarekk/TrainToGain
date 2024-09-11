from rest_framework import serializers

from .models import Exercise, Workout, WorkoutDetails


class GetWorkoutDetails(serializers.ModelSerializer):
    workout = serializers.SlugRelatedField(read_only=True, slug_field="name")
    exercise = serializers.SlugRelatedField(read_only=True, slug_field="name")

    class Meta:
        model = WorkoutDetails
        fields = '__all__'


class GetExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'


class CreateExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'


class GetWorkoutSerializer(serializers.ModelSerializer):
    createdBy = serializers.SlugRelatedField(read_only=True, slug_field="login")
    # exercises = GetExerciseSerializer(many=True, read_only=True)
    details = GetWorkoutDetails(many=True, read_only=True)

    class Meta:
        model = Workout
        fields = '__all__'
        # exclude = ["exercises"]
        depth = 3


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
