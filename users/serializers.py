from rest_framework import serializers
from .models import Profile
from django.contrib.auth import get_user_model


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'first_name', 'last_name', 'profile', 'email')


# noinspection PyAbstractClass
class PasswordChangeSerializer(serializers.Serializer):
    model = get_user_model()

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
