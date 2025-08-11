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
def data(request):
    input_food = "cheese"
    cal = 20  # Numeric, so no %

    with connections['food_db'].cursor() as cursor:
        cursor.execute(
            # 'SELECT * FROM merged_food_data WHERE food LIKE %s AND "Caloric Value" < %s',
            # [f"%{input_food}%", cal]
            'SELECT * FROM merged_food_data'
        )
        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()
    data = [dict(zip(columns, row)) for row in rows]
    return JsonResponse({'nutrients': data}, safe=False)

class FoodDetectView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            text_value = request.POST.get('food_name')
            output=data(text_value)
            return Response({'prediction':output})

        image = request.FILES['image']
        prediction = predict_image(image)
        return Response({'prediction': prediction})
        # data()
    
    # myapp/views.py


