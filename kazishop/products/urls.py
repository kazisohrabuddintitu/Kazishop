from django.urls import path, include
from products import views

urlpatterns = [
    path('latest-product/', views.LatestProductList.as_view())
]
