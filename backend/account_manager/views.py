from rest_framework import generics
from .models import User, EmailVerification
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    UserCreateSerializer,
    MyTokenObtainPairSerializer,
    EmailVerificationSerializer,
    UserDetailSerializer,
)
from rest_framework.views import APIView
from django.contrib.auth import logout
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.http import HttpResponse
import string
import random
from rest_framework.decorators import api_view
from rest_framework_simplejwt.authentication import JWTAuthentication
from .permissions import UserDetailPermission


class UserProfileCreateApi(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)

        validated_data = request.data
        serializer = self.get_serializer(data=validated_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        print(serializer.data)
        code = "".join(random.choices(string.digits, k=4))
        user = User.objects.get(email=serializer.data["email"])

        verification = EmailVerification(user=user, code=code)
        verification.save()

        send_mail(
            "Verify your email address",
            f"Your verification code is: {code}",
            "ozonebhattarai@gmail.com",
            [serializer.data["email"]],
            fail_silently=False,
        )

        # send_welcome_email(request.user)
        return Response(
            {"success": "Created account Successfully"},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class UserDetailApi(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = "id"
    authentication_classes = [JWTAuthentication]
    permission_classes = [UserDetailPermission]


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserLogoutView(APIView):
    def get(self, request):
        logout(request)
        return Response({"success": True})


@api_view(["POST"])
def verify_email(request):
    serializer = EmailVerificationSerializer(data=request.data)
    print(serializer)

    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data["email"]
    code = serializer.validated_data["code"]

    # Get the EmailVerification object with the matching code and user
    try:
        verification = EmailVerification.objects.get(user__email=email, code=code)
    except:
        return Response({"message": "Invalid code"}, status=status.HTTP_400_BAD_REQUEST)

    # Mark the user's email as verified
    user = verification.user
    user.is_active = True
    user.save()

    # Delete the EmailVerification object
    verification.delete()

    return Response({"message": "Email verified"}, status=status.HTTP_200_OK)
