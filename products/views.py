from django.shortcuts import render
from .models import Product, Review, Order
from .serializers import ProductSerializer, ReviewSerializer, OrderSerializer
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .permissions import ProductPermissions, ReviewPermissions, OrderPermissions
# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, ProductPermissions]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    @action(detail=True)
    def get_reviews(self, request, pk=None):
        """
        Get all reviews for a Product
        """
        reviews = Review.objects.filter(product=self.get_object())
        page = self.paginate_queryset(reviews)
        if page is not None:
            serializer = ReviewSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, ReviewPermissions]

    def perform_create(self, serializer):
        serializer.save(reviewer=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, OrderPermissions]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-date_ordered')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, product=Product.objects.get(id=self.request.data['product']))
