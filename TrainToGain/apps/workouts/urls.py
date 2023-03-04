from django.urls import include, path

from . import views

urlpatterns = [

    path('exercises/', views.ListExercisesView.as_view()),
    path('exercise/<int:pk>/', views.DetailOrUpdateExerciseView.as_view()),
    path('exercise/search/', views.list_search_exercises),
    path('createExercise/', views.CreateExerciseView.as_view()),
    path('workouts/', views.ListWorkoutView.as_view()),
    path('workout/<int:pk>/', views.DetailOrUpdateWorkoutView.as_view()),
    path('createWorkout/', views.CreateWorkoutView.as_view())
]
