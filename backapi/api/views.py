from django.shortcuts import render,HttpResponse

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connections
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import predict_image  # Import your model


# @api_view(['POST'])
def data1(input_food):
    with connections['food_db'].cursor() as cursor:
        cursor.execute(
            'SELECT * FROM merged_food_data WHERE food LIKE %s',
            [f"%{input_food}%"]
        )
        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()
    return [dict(zip(columns, row)) for row in rows]


def extract_macros(values):
    """Extract macros from the first DB match if available"""
    if values and isinstance(values, list) and len(values) > 0:
        first = values[0]
        return {
            "calories": first.get("calories", 0),
            "protein": first.get("protein", 0),
            "carbs": first.get("carbs", 0),
            "fats": first.get("fats", 0),
        }
    return {}

class FoodDetectView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request):
        prediction = None
        values = []
        macros = {}

        # Case 1: Food name provided directly
        if request.POST.get('food_name'):
            prediction = request.POST.get('food_name')
            values = data1(prediction)
            macros = extract_macros(values)
            return Response({
                "prediction": prediction,
                "macros": macros,
                "values": values
            })

        # Case 2: Image uploaded
        if 'image' in request.FILES:
            image = request.FILES['image']
            prediction = predict_image(image)  # This should return the food name
            values = data1(prediction)
            macros = extract_macros(values)
            return Response({
                "prediction": prediction,
                "macros": macros,
                "values": values
            })

        return Response({"error": "No food name or image provided"}, status=400)
    
# @api_view(['POST'])
# def register_user(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
#     if User.objects.filter(username=username).exists():
#         return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
#     user = User.objects.create_user(username=username, password=password)
#     return Response({'message': 'User created successfully'})