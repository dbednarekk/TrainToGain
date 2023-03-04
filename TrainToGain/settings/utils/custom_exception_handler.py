from django.http.response import Http404
from rest_framework.exceptions import ValidationError
from rest_framework.views import exception_handler
from rest_framework_simplejwt.exceptions import InvalidToken


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        
        if isinstance(exc, ValidationError):
            response.data['message'] = "Invalid: "+" ".join(
                mess for mess in exc.detail.keys())
        elif isinstance(exc, InvalidToken):
             response.data['message'] = exc.detail['messages'][0]['message']
        elif isinstance(exc, Http404):
            return response
        else:
            response.data['message'] = exc.detail
        response.data['status_code'] = response.status_code
    return response