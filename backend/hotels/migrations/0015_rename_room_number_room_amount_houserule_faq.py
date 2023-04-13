# Generated by Django 4.1.7 on 2023-04-13 03:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("hotels", "0014_review_room"),
    ]

    operations = [
        migrations.RenameField(
            model_name="room",
            old_name="room_number",
            new_name="amount",
        ),
        migrations.CreateModel(
            name="HouseRule",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("rule", models.CharField(max_length=200)),
                (
                    "hotel",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="hotels.hotel"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="FAQ",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("question", models.CharField(max_length=200)),
                ("answer", models.TextField()),
                (
                    "hotel",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="hotels.hotel"
                    ),
                ),
            ],
        ),
    ]
