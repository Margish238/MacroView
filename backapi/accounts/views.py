from rest_framework import generics, status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, RegisterSerializer, UserSerializer, UserUpdateSerializer, ChangePasswordSerializer,MacroTrackSerializer
from .models import MacroTrack

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserUpdateSerializer(request.user, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password changed successfully"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AddMacroTrackView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # print("RAW DATA RECEIVED:", request.data)
        serializer = MacroTrackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(
                user=request.user,
                food_name=request.data.get('food_name'),
                calories=request.data.get('calories'),
                protein=request.data.get('protein'),
                carbs=request.data.get('carbs'),
                fats=request.data.get('fats')
            )
            return Response({"message": "Food entry added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch all macro entries for logged-in user
        macros = MacroTrack.objects.filter(user=request.user).order_by('-date')
        serializer = MacroTrackSerializer(macros, many=True)
        return Response(serializer.data)