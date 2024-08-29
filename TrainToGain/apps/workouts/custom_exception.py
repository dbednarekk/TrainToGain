from rest_framework.exceptions import APIException


class CustomWorkoutExerciseException(APIException):
    status_code = 400
    default_detail = "Invalid data"
