# Generated by Django 3.1.2 on 2020-10-31 02:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_order_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('SHIP', 'Preparing to Ship'), ('DISP', 'Dispatched'), ('DELI', 'Delivered')], default='SHIP', max_length=5),
        ),
    ]
