from django.urls import path
from .views import RegisterView, ProfileView, ChangePasswordView, AddMacroTrackView, UserHistoryView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='auth_register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('addMacro/', AddMacroTrackView.as_view(), name='addMacro'),
    path('usermacros/', UserHistoryView.as_view(), name='user-macros'),
]