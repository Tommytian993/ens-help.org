from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
router.register(r"provinces", views.ProvinceViewSet)
router.register(r"cities", views.CityViewSet)
router.register(r"clinics", views.ClinicViewSet)
router.register(r"patients", views.PatientViewSet)
router.register(r"health-logs", views.HealthLogViewSet)
router.register(r"memorials", views.MemorialViewSet)
router.register(r"users", views.UserViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]

