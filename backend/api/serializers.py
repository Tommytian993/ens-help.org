from rest_framework import serializers
from django.contrib.auth.models import User
from map.models import Province, City, Clinic, Patient, HealthLog, Memorial


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "date_joined"]
        read_only_fields = ["id", "date_joined"]


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"


class ProvinceSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)

    class Meta:
        model = Province
        fields = "__all__"


class ClinicSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source="city.name", read_only=True)
    province_name = serializers.CharField(source="city.province.name", read_only=True)

    class Meta:
        model = Clinic
        fields = "__all__"


class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    city_name = serializers.CharField(source="city.name", read_only=True)

    class Meta:
        model = Patient
        fields = "__all__"


class HealthLogSerializer(serializers.ModelSerializer):
    patient_username = serializers.CharField(source="patient.user.username", read_only=True)

    class Meta:
        model = HealthLog
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]


class MemorialSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source="city.name", read_only=True)
    created_by_username = serializers.CharField(source="created_by.username", read_only=True)

    class Meta:
        model = Memorial
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at", "created_by"]


class MapDataSerializer(serializers.Serializer):
    """地图数据序列化器"""
    name = serializers.CharField()
    value = serializers.IntegerField()
    adcode = serializers.CharField()
    clinics = serializers.IntegerField()
    patients = serializers.IntegerField()

