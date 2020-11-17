from rest_framework import serializers
from .models import Product, Review, Order
from django.contrib.auth import get_user_model


class ProductSerializer(serializers.ModelSerializer):
    # seller = serializers.RelatedField(
    #     source='seller.id',
    #     default=serializers.CurrentUserDefault(),
    #     queryset=get_user_model().objects.all(),
    # )

    seller = serializers.SerializerMethodField('get_seller_id')

    def get_seller_id(self, obj):
        return obj.seller.id

    class Meta:
        model = Product
        fields = ['id', 'seller', 'title', 'description', 'cost', 'discounted_cost', 'date_added', 'slug']


class ReviewSerializer(serializers.ModelSerializer):
    # reviewer = serializers.RelatedField(
    #     source='reviewer.id',
    #     default=serializers.CurrentUserDefault(),
    #     queryset=get_user_model().objects.all(),
    # )

    reviewer = serializers.SerializerMethodField('get_reviewer_id')
    product = ProductSerializer()

    def get_reviewer_id(self, obj):
        return obj.reviewer.id

    class Meta:
        model = Review
        fields = ['id', 'reviewer', 'stars', 'title', 'content', 'product', 'date_added', 'stars']


class OrderSerializer(serializers.ModelSerializer):
    # user = serializers.RelatedField(
    #     source='user.id',
    #     default=serializers.CurrentUserDefault(),
    #     queryset=get_user_model().objects.all(),
    # )
    user = serializers.SerializerMethodField('get_user_id')
    product = ProductSerializer(many=False, read_only=True)

    def get_user_id(self, obj):
        return obj.user.id

    class Meta:
        model = Order
        fields = ['id', 'user', 'product', 'status', 'quantity']
