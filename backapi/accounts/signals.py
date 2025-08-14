# accounts/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import MacroTrack
from .utils import update_daily_macro_summary

@receiver(post_save, sender=MacroTrack)
def update_summary_on_macrotrack_save(sender, instance, **kwargs):
    """When MacroTrack is created/updated, update the daily macro summary."""
    update_daily_macro_summary(instance.user)
