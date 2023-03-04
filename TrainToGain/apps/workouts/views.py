

from rest_framework import generics, permissions
from rest_framework.decorators import api_view, parser_classes
from rest_framework.exceptions import ValidationError
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from .custom_exception import CustomWorkoutExerciseException
from .models import Exercise, Workout
from .permissions import IsOwnerOrReadOnly
from .serializer import (CreateExerciseSerializer, CreateWorkoutSerializer,
                         GetExerciseSerializer, GetWorkoutSerializer)


class ListExercisesView(generics.ListAPIView):
    """
    Class providing view to list of all Exercises
    """
    queryset = Exercise.objects.all()
    serializer_class = GetExerciseSerializer
    permission_classes = [permissions.AllowAny]


@api_view(['GET'])
@parser_classes([JSONParser])
def list_search_exercises(request):
    """
    Method that return list of exercises that includes name parameter
    """
    try:
        exercises = Exercise.objects.filter(
            name__contains=request.query_params['name'])
    except Exercise.DoesNotExist:
        return Response(status=200, data='')
    serializer = GetExerciseSerializer(exercises, many=True)
    return Response(status=200, data=serializer.data)


class DetailOrUpdateExerciseView(generics.RetrieveUpdateDestroyAPIView):
    """
    Class providing view to detailed view of given Exercise
    or modification and remove of given Exercise if user is owner
    """
    queryset = Exercise.objects.all(
    )  # TODO do I need all()? maybe filter(request.user.login)
    serializer_class = GetExerciseSerializer
    permission_classes = [IsOwnerOrReadOnly]


class CreateExerciseView(generics.CreateAPIView):
    """
    Class providing view to create a new Exercise if user is logged in
    """
    serializer_class = CreateExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        queryset = Exercise.objects.filter(name=self.request.data['name'])

        if queryset.exists():
            raise ValidationError("Given exercise already exists")
        serializer = CreateExerciseSerializer(data=self.request.data)
        self.perform_save(serializer)
        return Response(queryset.get().id, status=200)

    def perform_save(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save(createdBy=self.request.user, **self.request.data)


@api_view(['PATCH'])
def upload_image(request, pk: int):
    """
    Endpoint used for uploading exercise image
    """
    try:
        exercise = Exercise.objects.get(pk=pk)
        serializer = CreateExerciseSerializer(
            exercise, data={'picture': request.data['picture']}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
    except Exercise.DoesNotExist:
        raise CustomWorkoutExerciseException("Error during uploading a photo")
    return Response(status=201, data={'Upload image successfully'})


class ListWorkoutView(generics.ListAPIView):
    """
    Class providing view to list of all Workouts
    """
    queryset = Workout.objects.all()
    serializer_class = GetWorkoutSerializer
    permission_classes = [permissions.AllowAny]


class DetailOrUpdateWorkoutView(generics.RetrieveUpdateDestroyAPIView):
    """
    Class providing view to detailed view of given Workout
    or modification and remove of given Workout if user is owner
    """
    queryset = Workout.objects.all()  # TODO do I need all()? maybe filter(request.user.login)
    serializer_class = GetWorkoutSerializer
    permission_classes = [IsOwnerOrReadOnly]


class CreateWorkoutView(generics.CreateAPIView):
    """
    Class providing view to create a new Workout if user is logged in
    """
    serializer_class = CreateWorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        queryset = Workout.objects.filter(name=self.request.data['name'])

        if queryset.exists():
            raise CustomWorkoutExerciseException(
                "Given workout already exists")
        serializer.save(createdBy=self.request.user, **self.request.data)
