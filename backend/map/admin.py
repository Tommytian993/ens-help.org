from django.contrib import admin
from .models import Province, City, Clinic, Patient, HealthLog, Memorial


@admin.register(Province)
class ProvinceAdmin(admin.ModelAdmin):
    list_display = ['name', 'adcode', 'patient_count', 'clinic_count', 'created_at']
    search_fields = ['name', 'adcode']
    list_filter = ['created_at']


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ['name', 'province', 'adcode', 'patient_count', 'clinic_count', 'created_at']
    search_fields = ['name', 'adcode']
    list_filter = ['province', 'created_at']


@admin.register(Clinic)
class ClinicAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'phone', 'created_at']
    search_fields = ['name', 'address', 'phone']
    list_filter = ['city', 'created_at']


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['user', 'city', 'created_at']
    search_fields = ['user__username']
    list_filter = ['city', 'created_at']


@admin.register(HealthLog)
class HealthLogAdmin(admin.ModelAdmin):
    list_display = ['patient', 'date', 'severity', 'sleep_quality', 'created_at']
    search_fields = ['patient__user__username']
    list_filter = ['date', 'severity', 'created_at']


@admin.register(Memorial)
class MemorialAdmin(admin.ModelAdmin):
    list_display = ['name', 'death_date', 'city', 'created_by', 'created_at']
    search_fields = ['name', 'message']
    list_filter = ['death_date', 'city', 'created_at']
