from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from map.models import Province, City, Clinic, Patient, HealthLog, Memorial
from api.serializers import (
    UserSerializer,
    ProvinceSerializer,
    CitySerializer,
    ClinicSerializer,
    PatientSerializer,
    HealthLogSerializer,
    MemorialSerializer,
    MapDataSerializer,
)


class ProvinceViewSet(viewsets.ModelViewSet):
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer

    @action(detail=True, methods=["get"])
    def cities(self, request, pk=None):
        """获取省份下的所有城市"""
        province = self.get_object()
        cities = City.objects.filter(province=province)
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def map_data(self, request):
        """获取地图数据格式"""
        provinces = Province.objects.all()
        data = []
        for province in provinces:
            data.append({
                "name": province.name,
                "value": province.patient_count,
                "adcode": province.adcode,
                "clinics": province.clinic_count,
                "patients": province.patient_count,
            })
        serializer = MapDataSerializer(data, many=True)
        return Response(serializer.data)


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer

    @action(detail=False, methods=["get"])
    def by_province(self, request):
        """根据省份获取城市"""
        province_id = request.query_params.get("province_id")
        if province_id:
            cities = City.objects.filter(province_id=province_id)
        else:
            cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def map_data(self, request, pk=None):
        """获取城市地图数据格式"""
        city = self.get_object()
        data = [{
            "name": city.name,
            "value": city.patient_count,
            "adcode": city.adcode,
            "clinics": city.clinic_count,
            "patients": city.patient_count,
        }]
        serializer = MapDataSerializer(data, many=True)
        return Response(serializer.data)


class ClinicViewSet(viewsets.ModelViewSet):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer

    @action(detail=False, methods=["get"])
    def by_city(self, request):
        """根据城市获取诊所"""
        city_id = request.query_params.get("city_id")
        if city_id:
            clinics = Clinic.objects.filter(city_id=city_id)
        else:
            clinics = Clinic.objects.all()
        serializer = ClinicSerializer(clinics, many=True)
        return Response(serializer.data)


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def get_queryset(self):
        """根据用户过滤患者"""
        user = self.request.user
        if user.is_authenticated:
            return Patient.objects.filter(user=user)
        return Patient.objects.none()


class HealthLogViewSet(viewsets.ModelViewSet):
    queryset = HealthLog.objects.all()
    serializer_class = HealthLogSerializer

    def get_queryset(self):
        """根据用户过滤健康日志"""
        user = self.request.user
        if user.is_authenticated:
            try:
                patient = Patient.objects.get(user=user)
                return HealthLog.objects.filter(patient=patient)
            except Patient.DoesNotExist:
                return HealthLog.objects.none()
        return HealthLog.objects.none()

    def perform_create(self, serializer):
        """创建健康日志时自动关联患者"""
        user = self.request.user
        if user.is_authenticated:
            patient, _ = Patient.objects.get_or_create(user=user)
            serializer.save(patient=patient)


class MemorialViewSet(viewsets.ModelViewSet):
    queryset = Memorial.objects.all()
    serializer_class = MemorialSerializer

    def perform_create(self, serializer):
        """创建纪念记录时自动关联创建者"""
        if self.request.user.is_authenticated:
            serializer.save(created_by=self.request.user)
        else:
            serializer.save()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=["get"])
    def current(self, request):
        """获取当前用户信息"""
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        return Response({"detail": "未登录"}, status=status.HTTP_401_UNAUTHORIZED)
