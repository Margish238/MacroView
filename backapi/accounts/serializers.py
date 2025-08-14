from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import MacroTrack,DailyMacroSummary

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email')#, 'first_name', 'last_name'
        # extra_kwargs = {
        #     'first_name': {'required': True},
        #     'last_name': {'required': True}
        # }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords didn't match"})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'date_joined']

class UserUpdateSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'current_password']

    def validate(self, attrs):
        request = self.context.get('request')
        user = request.user

        # If current_password provided, check it
        if attrs.get('current_password'):
            if not user.check_password(attrs['current_password']):
                raise serializers.ValidationError({"current_password": "Incorrect password."})
        
        return attrs

    def update(self, instance, validated_data):
        validated_data.pop('current_password', None)  # not saved
        return super().update(instance, validated_data)


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect.")
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        new_password = self.validated_data['new_password']
        user.set_password(new_password)
        user.save()
        return user

class MacroTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = MacroTrack
        fields = ['id','user', 'food_name', 'calories', 'protein', 'carbs', 'fats', 'date', 'day']
        read_only_fields = ['id', 'user', 'food_name', 'calories', 'protein', 'carbs', 'fats', 'date', 'day']


class DailyMacroSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyMacroSummary
        fields = '__all__'

