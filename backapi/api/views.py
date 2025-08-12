from django.shortcuts import render,HttpResponse

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connections
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import predict_image


def getData(input_food):
    search=str(input_food).split('_')
    with connections['food_db'].cursor() as cursor:
        # print(search,'\n',cursor)
        query = """SELECT * FROM merged_food_data WHERE """ + " AND ".join(["LOWER(food) LIKE %s" for _ in search])
        params = [f"%{opt.lower()}%" for opt in search]
        cursor.execute(query, params)
        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()
    return [dict(zip(columns, row)) for row in rows]

def extract_macros(values):
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
            values = getData(prediction)
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
            print(prediction)
            values = getData(prediction)
            # print(values)
            macros = extract_macros(values)
            return Response({
                "prediction": prediction,
                "macros": macros,
                "values": values
            })

        return Response({"error": "No food name or image provided"}, status=400)
