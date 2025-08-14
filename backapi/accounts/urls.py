from django.urls import path
from .views import RegisterView, ProfileView, ChangePasswordView, AddMacroTrackView, UserHistoryView, EnsureTodaySummaryView,UpdateGoalsView,TodaySummaryView,WeeklySummaryView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='auth_register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('addMacro/', AddMacroTrackView.as_view(), name='addMacro'),
    path('usermacros/', UserHistoryView.as_view(), name='user-macros'),
    path('summary/ensure_today/', EnsureTodaySummaryView.as_view(), name='ensure_today_summary'),
    path('summary/update_goals/', UpdateGoalsView.as_view(), name='update-goals'),
    path("summary/today/", TodaySummaryView.as_view(), name="today-summary"),
    path('summary/weekly/', WeeklySummaryView.as_view(), name='weekly-summary'),
]