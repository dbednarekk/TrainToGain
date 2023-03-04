from unicodedata import name

from rest_framework import serializers

from .models import Exercise, ExerciseDetails, Workout


class GetExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        exclude = ['createdBy']


class CreateExerciseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exercise
        fields = '__all__'
        extra_kwargs = {'createdBy': {'required': False}}


class GetWorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'
        depth = 1


class CreateWorkoutSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workout
        fields = '__all__'
        extra_kwargs = {'createdBy': {'required': False}}

    def create(self, validated_data):
        workout = Workout.objects.create(
            name=validated_data["name"],
            description=validated_data["description"],
            createdBy=validated_data["createdBy"].login)
        for exercise in validated_data["exercises"]:
            sets = exercise['number_of_sets']
            reps = exercise['number_of_reps']
            weight = exercise['weight']
            ex_from_db = Exercise.objects.get(name=exercise['name'])
            ex_details = ExerciseDetails.objects.create(
                workout=workout,
                exercise=ex_from_db,
                number_of_sets=sets,
                number_of_reps=reps,
                weight=weight
            )
            ex_details.save()
        return workout
