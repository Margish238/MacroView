from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def detect_food(request):
    name = request.POST.get('name', None)
    image = request.FILES.get('image', None)

    # For now, dummy response
    food_name = name or "Pizza"

    dummy_macros = {
        "calories": 300,
        "protein": 12,
        "fat": 10,
        "carbs": 35
    }

    return Response({
        "food": food_name,
        "macros": dummy_macros
    })
