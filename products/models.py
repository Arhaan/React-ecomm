from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from autoslug import AutoSlugField
from django.core.validators import MinValueValidator
# Create your models here.


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('GEN', 'General'),
        ('BOOKS', 'Books'),
        ('BEAUTY', 'Beauty'),
        ('CLOTH', 'Clothing'),
        ('MUSIC', 'Musical Instruments'),
    ]
    seller = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(max_length=1000, null=False)
    description = models.TextField(null=False)
    cost = models.DecimalField(max_digits=8, decimal_places=2)  # In dollars. TODO: Add django-money
    discounted_cost = models.DecimalField(max_digits=8, decimal_places=2, default=cost)
    date_added = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='GEN')
    slug = AutoSlugField(populate_from='title', unique=True)

    def __unicode__(self):
        return f'{self.id}'



class Review(models.Model):
    class Stars(models.IntegerChoices):
        BAD = 1
        AVERAGE = 2
        GOOD = 3
        VERY_GOOD = 4
        EXCELLENT = 5
    reviewer = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    stars = models.IntegerField(choices=Stars.choices)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    title = models.CharField(max_length=1000)
    content = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)


class Order(models.Model):
    # noinspection SpellCheckingInspection
    STATUS_CHOICES = [
        ('SHIP', 'Preparing to Ship'),
        ('DISP', 'Dispatched'),
        ('DELI', 'Delivered'),
    ]
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)  # Do not allow deleting of any product
    status = models.CharField(max_length=5, choices=STATUS_CHOICES, default='SHIP')
    quantity = models.IntegerField(validators=[MinValueValidator(1)], default=1)
    date_ordered = models.DateTimeField(auto_now_add=True)
# TODO: Add image functionality
