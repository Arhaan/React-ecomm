from django.test import TestCase
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from .models import Order, Product
# Create your tests here.


def create_user(username="TestUser", password="TestPass"):
    user = get_user_model().objects.create(username=username)
    user.set_password(password)
    user.save()
    return user


def create_product(title="Test", cost=100, seller=None):
    if seller is None:
        seller = create_user()
    product = Product.objects.create(seller=seller, title=title, cost=cost)
    product.save()
    return product


def create_order(product=None, user=None):
    if product is None:
        product = create_product()
    if user is None:
        user = create_user(username="Test2")
    order = Order.objects.create(product=product, user=user)
    return order


class OrderTests(APITestCase):
    def test_create_order_works(self):
        user = create_user()
        token = self.client.post(reverse('auth-token'), {'username': 'TestUser', 'password': 'TestPass'}).data.token
        product = create_product(seller=user)

        response = self.client.post('product:orders-list', {'user': user.id, 'product': product.id}, ) # not finished
