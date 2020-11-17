from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .serializers import UserProfileSerializer, PasswordChangeSerializer
from .permissions import UserPermissions, ChangePasswordPermission
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import action
# Create your views here.


class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [UserPermissions]

    def create(self, request, *args, **kwargs):
        serializer = UserProfileSerializer(data=request.data)
        if request.data['password'] != request.data['confirm-pass']:
            return Response({'error': 'Password and Confirm Password do not match'}, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save(password=request.data['password'])
            return Response({'status': 'User Created'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        # Return present user if logged in else return error
        if self.request.user.is_authenticated:
            serializer = UserProfileSerializer(self.request.user)
            return Response(serializer.data)
        return Response({"list": "User is not logged in"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def retrieve(self, request, *args, **kwargs):
        try:
            user = get_user_model().objects.get(id=kwargs['pk'])
        except get_user_model().DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserProfileSerializer(
            user
        )
        # breakpoint()
        return Response(serializer.data)


class UpdatePasswordView(generics.UpdateAPIView):
    serializer_class = PasswordChangeSerializer
    model = get_user_model()
    permission_classes = [IsAuthenticatedOrReadOnly, ChangePasswordPermission]

    def update(self, request, *args, **kwargs):
        obj = self.request.user
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if not obj.check_password(serializer.data.get("old_password")):
                return Response({'old_password': ["Wrong Password"]}, status=status.HTTP_400_BAD_REQUEST)
            obj.set_password(serializer.data.get("new_password"))
            obj.save()
            return Response({
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password Updated Successfully',
                'date': []
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
