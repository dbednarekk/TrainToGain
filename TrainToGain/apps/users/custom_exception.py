from rest_framework.exceptions import APIException


class CustomUserException(APIException):
    status_code=400
    default_detail="Invalid data"