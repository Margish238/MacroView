from django.contrib import admin

# Register your models here.
from django.contrib import admin
# from .models import FoodItem
from .models import Food

# @admin.register(FoodItem)
# class FoodItemAdmin(admin.ModelAdmin):
#     list_display = ('name', 'calories', 'protein', 'fat', 'carbs')
#     search_fields = ('name',)

admin.site.register(Food)