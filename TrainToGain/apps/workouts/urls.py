from django.urls import path

from . import views

urlpatterns = [

    path('exercises/', views.ListExercisesView.as_view()),
    path('exercise/search/', views.list_search_exercises),
    path('exercise/<int:pk>/', views.DetailOrUpdateExerciseView.as_view()),
    path('createExercise/', views.CreateExerciseView.as_view()),
    path('workouts/', views.ListWorkoutView.as_view()),
    path('workouts/self', views.ListSelfWorkoutView.as_view()),
    path('workout/<int:pk>/', views.DetailOrUpdateWorkoutView.as_view()),
    path('createWorkout/', views.CreateWorkoutView.as_view())
]
