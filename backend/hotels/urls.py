from django.urls import path
from .views import (
    HotelCreateApi,
    HotelDetailApi,
    HotelListApi,
    HotelSearchApi,
    HotelsByLocationApi,
    HotelByLocationAndNameApi,
    recommend_hotels,
)


urlpatterns = [
    path("hotels/", HotelListApi.as_view(), name="hotels"),
    path("hotels/<int:id>", HotelDetailApi.as_view(), name="hotels"),
    path("hotels/search/", HotelSearchApi.as_view(), name="hotel_search"),
    path("add-hotel/", HotelCreateApi.as_view(), name="hotels"),
    # path('create-booking/', BookingCreateApi.as_view(), name='booking'),
    path(
        "hotels-by-location/", HotelsByLocationApi.as_view(), name="hotel_by_location"
    ),
    path(
        "hotels/hotels-by-name-location/",
        HotelByLocationAndNameApi.as_view(),
        name="hotel_by_location",
    ),
    path("hotels/recommend-hotels/", recommend_hotels, name="recommend"),
]
