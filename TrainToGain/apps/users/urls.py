from django.urls import include, path

from . import views

urlpatterns = [

    path('<int:pk>/uploadImage', views.upload_image),
    path('change_password/', views.change_user_password),
    path('create/', views.CreateUserView.as_view()),
    path('<str:login>/', views.UserView.as_view()),
]
