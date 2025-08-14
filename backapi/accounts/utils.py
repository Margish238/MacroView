from django.utils import timezone
from .models import MacroTrack,DailyMacroSummary
from datetime import date
from django.db.models import Sum



def ensure_today_summary(user):
    today = date.today()
    print(f"[DEBUG] Checking/creating summary for {user} on {today}")

    summary, created = DailyMacroSummary.objects.get_or_create(
        user=user,
        date=today,
        defaults={
            "day": today.strftime("%A"),
            "goals": {},
            "calories_sum": 0,
            "protein_sum": 0,
            "carbs_sum": 0,
            "fat_sum": 0
        }
    )

    if created:
        print(f"[DEBUG] Created new summary row for {user} on {today}")
    else:
        print(f"[DEBUG] Found existing summary row for {user} on {today}")

    return summary

def update_daily_macro_summary(user):
    """Recalculate and update the daily macro summary for the given user."""
    today = date.today()

    # Step 1: Get sums of macros for this user & date
    sums = MacroTrack.objects.filter(user=user, date=today).aggregate(
        total_calories=Sum("calories"),
        total_protein=Sum("protein"),
        total_carbs=Sum("carbs"),
        total_fat=Sum("fats")
    )

    # Step 2: Ensure summary row exists
    summary, _ = DailyMacroSummary.objects.get_or_create(
        user=user,
        date=today,
        defaults={
            "goals": {"calories": 0, "protein": 0, "carbs": 0, "fat": 0},
            "calories_sum": 0,
            "protein_sum": 0,
            "carbs_sum": 0,
            "fat_sum": 0
        }
    )

    # Step 3: Update sums in the summary
    summary.calories_sum = sums["total_calories"] or 0
    summary.protein_sum = sums["total_protein"] or 0
    summary.carbs_sum = sums["total_carbs"] or 0
    summary.fat_sum = sums["total_fat"] or 0
    summary.save()

    return summary
