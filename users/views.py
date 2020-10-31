from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .serializers import UserProfileSerializer, PasswordChangeSerializer
from .permissions import UserPermissions, ChangePasswordPermission
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import generics, status
from rest_framework.response import Response
# Create your views here.


class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, UserPermissions]

    def get_queryset(self):
        return get_user_model().objects.filter(pk=self.request.user.pk)


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
