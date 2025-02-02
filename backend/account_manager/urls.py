from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import (
    UserListSerializer,
    UserProfileCreateApi,
    MyTokenObtainPairView,
    UserLogoutView,
    verify_email,
    UserDetailApi,
)
from account_manager import views
from rest_framework.urlpatterns import format_suffix_patterns

# from .views import TokenViewSet

# user_list = TokenViewSet.as_view({'get': 'list'})


urlpatterns = [
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", UserProfileCreateApi.as_view(), name="register"),
    path("logout/", UserLogoutView.as_view(), name="logout"),
    path("verify/", verify_email, name="verify_email"),
    path("users/", UserListSerializer.as_view(), name="user_list"),
    path("user/<int:id>/", views.UserDetailApi.as_view(), name="profile"),
    path("user/<int:user_id>/send-reset", views.reset_password, name="profile"),
    path(
        "user/<int:id>/set-pass",
        views.PasswordUpdateView.as_view(),
        name="update-password",
    ),
    path(
        "user/<int:id>/update", views.UserProfileUpdate.as_view(), name="profile-update"
    ),
]
