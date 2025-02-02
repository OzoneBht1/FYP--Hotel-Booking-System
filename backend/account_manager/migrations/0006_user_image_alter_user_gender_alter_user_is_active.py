# Generated by Django 4.1.3 on 2022-12-24 05:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account_manager', '0005_rename_name_user_first_name_user_last_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(null=True, upload_to='profile_images/'),
        ),
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Others', 'Others')], max_length=10),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
