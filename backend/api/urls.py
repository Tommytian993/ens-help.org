from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
# Register your viewsets here

urlpatterns = [
    path("api/", include(router.urls)),
]
