from django.urls import path, include
from rest_framework.routers import DefaultRouter
from products import views
from users.views import UserProfileViewSet

router = DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'reviews', views.ReviewViewSet)
router.register(r'orders', views.OrderViewSet, basename='orders')
router.register(r'users', UserProfileViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
]
