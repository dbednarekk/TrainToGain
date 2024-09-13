from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from .views import UserViewSet

router = DefaultRouter()
router.register(r'', UserViewSet, basename='user')

urlpatterns = [
    path('change-password/', views.ChangePasswordView.as_view()),
    path('', include(router.urls))
]
