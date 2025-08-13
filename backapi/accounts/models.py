from django.db import models
from django.contrib.auth.models import User
from datetime import date

# Create your models here.
class MacroTrack(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food_name = models.CharField(max_length=100)
    calories = models.FloatField()
    protein = models.FloatField()
    carbs = models.FloatField() 
    fats = models.FloatField()
    date = models.DateField(default=date.today)
    day = models.CharField(max_length=20, blank=True)

    def save(self, *args, **kwargs):
        # Auto-fill day from date
        if not self.day:
            self.day = self.date.strftime("%A")  # e.g., Monday
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.food_name} ({self.date})"