from django.db import models
from django.contrib.auth.models import User
from datetime import date
from django.utils import timezone

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
        if not self.day:
            self.day = self.date.strftime("%A")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.food_name} ({self.date})"


class DailyMacroSummary(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='daily_summaries')
    date = models.DateField(default=timezone.localdate, db_index=True)
    day = models.CharField(max_length=9, blank=True)  # e.g., Monday

    goals = models.JSONField(default=dict, blank=True)

    calories_sum = models.FloatField(default=0)
    protein_sum  = models.FloatField(default=0)
    carbs_sum    = models.FloatField(default=0)
    fat_sum      = models.FloatField(default=0)

    class Meta:
        unique_together = ('user', 'date')
        ordering = ['-date']

    def save(self, *args, **kwargs):
        if not self.day:
            self.day = (self.date or timezone.localdate()).strftime('%A')

        if not isinstance(self.goals, dict):
            self.goals = {}
        for k in ('calories', 'protein', 'carbs', 'fat'):
            self.goals.setdefault(k, 0)

        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.username} - {self.date} ({self.day})'