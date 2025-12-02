from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
# Register your viewsets here

urlpatterns = [
    # 包含路由器的所有 URL（用于 ViewSet）
    path("api/", include(router.urls)),
    
    # 登录路由
    # 当用户访问 POST /api/auth/login/ 时，会调用 LoginView 的 post 方法
    # 例如：前端发送 POST 请求到 http://localhost:8000/api/auth/login/
    path("api/auth/login/", views.LoginView.as_view(), name="login"),
]
