from rest_framework.exceptions import APIException


def get_or_404(model, *args, **kwargs):
    try:
        return model.objects.get(**kwargs)
    except model.DoesNotExist:
        raise APIException(detail="Could not find object with given attributes", code=404)
