# Generated by Django 4.1.7 on 2023-03-24 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotels', '0012_alter_hotel_lat_alter_hotel_lng'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotel',
            name='lat',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='hotel',
            name='lng',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
