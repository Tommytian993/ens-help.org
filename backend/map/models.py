from django.db import models
from django.contrib.auth.models import User


class Province(models.Model):
    """省份模型"""
    name = models.CharField(max_length=50, unique=True, verbose_name="省份名称")
    adcode = models.CharField(max_length=10, unique=True, verbose_name="行政区划代码")
    patient_count = models.IntegerField(default=0, verbose_name="患者数量")
    clinic_count = models.IntegerField(default=0, verbose_name="诊所数量")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "省份"
        verbose_name_plural = "省份"
        ordering = ["-patient_count"]

    def __str__(self):
        return self.name


class City(models.Model):
    """城市模型"""
    name = models.CharField(max_length=50, verbose_name="城市名称")
    adcode = models.CharField(max_length=10, unique=True, verbose_name="行政区划代码")
    province = models.ForeignKey(
        Province, on_delete=models.CASCADE, related_name="cities", verbose_name="所属省份"
    )
    patient_count = models.IntegerField(default=0, verbose_name="患者数量")
    clinic_count = models.IntegerField(default=0, verbose_name="诊所数量")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "城市"
        verbose_name_plural = "城市"
        ordering = ["-patient_count"]

    def __str__(self):
        return f"{self.province.name} - {self.name}"


class Clinic(models.Model):
    """诊所模型"""
    name = models.CharField(max_length=200, verbose_name="诊所名称")
    city = models.ForeignKey(
        City, on_delete=models.CASCADE, related_name="clinics", verbose_name="所在城市"
    )
    address = models.TextField(blank=True, verbose_name="地址")
    phone = models.CharField(max_length=20, blank=True, verbose_name="电话")
    description = models.TextField(blank=True, verbose_name="描述")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "诊所"
        verbose_name_plural = "诊所"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.city.name} - {self.name}"


class Patient(models.Model):
    """患者模型"""
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, blank=True, verbose_name="关联用户"
    )
    city = models.ForeignKey(
        City, on_delete=models.SET_NULL, null=True, blank=True, related_name="patients", verbose_name="所在城市"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "患者"
        verbose_name_plural = "患者"
        ordering = ["-created_at"]

    def __str__(self):
        return f"患者 - {self.user.username if self.user else '匿名'}"


class HealthLog(models.Model):
    """健康日志模型"""
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_name="health_logs", verbose_name="患者"
    )
    date = models.DateField(verbose_name="日期")
    severity = models.IntegerField(
        choices=[(i, f"等级 {i}") for i in range(1, 11)],
        verbose_name="严重程度 (1-10)"
    )
    symptoms = models.JSONField(default=dict, verbose_name="症状")
    medication = models.TextField(blank=True, verbose_name="用药情况")
    sleep_quality = models.IntegerField(
        choices=[(i, f"等级 {i}") for i in range(1, 11)],
        verbose_name="睡眠质量 (1-10)"
    )
    notes = models.TextField(blank=True, verbose_name="备注")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "健康日志"
        verbose_name_plural = "健康日志"
        ordering = ["-date", "-created_at"]
        unique_together = ["patient", "date"]

    def __str__(self):
        return f"{self.patient} - {self.date}"


class Memorial(models.Model):
    """纪念园模型"""
    name = models.CharField(max_length=100, verbose_name="姓名")
    birth_date = models.DateField(null=True, blank=True, verbose_name="出生日期")
    death_date = models.DateField(verbose_name="逝世日期")
    city = models.ForeignKey(
        City, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="所在城市"
    )
    message = models.TextField(blank=True, verbose_name="留言")
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="创建者"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "纪念园"
        verbose_name_plural = "纪念园"
        ordering = ["-death_date", "-created_at"]

    def __str__(self):
        return f"{self.name} ({self.death_date})"
