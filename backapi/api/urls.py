from django.contrib import admin
from django.urls import path
from .views import FoodDetectView

from api import views
urlpatterns = [
    path('detect/', FoodDetectView.as_view(), name='food-detect'),
    path('data/',views.data1,name="data"), #for trail
]
