from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from autoslug import AutoSlugField
# Create your models here.


class User(AbstractUser):
    pass


def get_username(profile):
    return profile.user.username


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    address = models.TextField(null=True)  # TODO: Can use django addresses later
    pin_code = models.IntegerField(null=True)  # TODO: Implement in the forms that the pin code needs to be 6 digit long
    slug = AutoSlugField(populate_from=get_username, unique=True)

