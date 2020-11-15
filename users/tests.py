from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from rest_framework import status
from django.urls import reverse
# Create your tests here.


def create_user(username="TestUser", password="TestPass"):
    user = get_user_model().objects.create(username=username)
    user.set_password(password)
    user.save()
    return user


class AuthTests(APITestCase):
    def test_login_works(self):
        """
        Ensure login works
        """
        create_user()
        response = self.client.post(reverse('auth-token'), {'username': 'TestUser', 'password': 'TestPass'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_signup_works(self):
        """
        Ensure signup works
        """
        response = self.client.post(reverse('product:users-list'),
                                    {
                                        'username': 'Arhaan',
                                        'email': 'a@a.com',
                                        'address': 'abc',
                                        'pin_code': 2,
                                        'first_name': 'Arhaan',
                                        'last_name': 'Ahmad',
                                        'password': 'Hello',
                                        'confirm-pass': 'Hello',
                                    })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_signup_fails_when_passwords_dont_match(self):
        """
        Ensure signup fails if password and confirm-pass don't match
        """
        response = self.client.post(reverse('product:users-list'),
                                    {
                                        'username': 'Arhaan',
                                        'email': 'a@a.com',
                                        'address': 'abc',
                                        'pin_code': 2,
                                        'first_name': 'Arhaan',
                                        'last_name': 'Ahmad',
                                        'password': 'Hello',
                                        'confirm-pass': 'abc',
                                    })
        self.assertNotEqual(response.status_code, status.HTTP_200_OK)