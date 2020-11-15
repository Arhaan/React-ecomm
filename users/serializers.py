from rest_framework import serializers
from .models import Profile
from django.contrib.auth import get_user_model


class UserProfileSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField()
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    address = serializers.CharField()
    pin_code = serializers.IntegerField()

    def create(self, validated_data):
        user = get_user_model().objects.create(
           username=validated_data['username'],
           first_name=validated_data['first_name'],
           last_name=validated_data['last_name'],
           email=validated_data['email'],
        )
        user.profile.address = validated_data['address']
        user.profile.pin_code = validated_data['pin_code']
        user.set_password(validated_data['password'])
        user.save()
        return user

    # class Meta:
    #     model = get_user_model()
    #     fields = ('id', 'username', 'first_name', 'last_name', 'profile', 'email')


# noinspection PyAbstractClass
class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=False)
    new_password = serializers.CharField(required=True)
    conf_password = serializers.CharField(required=True)
