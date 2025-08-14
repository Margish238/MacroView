from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import MacroTrack,DailyMacroSummary

admin.site.register(MacroTrack)

@admin.register(DailyMacroSummary)
class DailyMacroSummaryAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'day', 'calories_sum', 'protein_sum', 'carbs_sum', 'fat_sum')
    list_filter  = ('user', 'date', 'day')
    search_fields = ('user__username',)