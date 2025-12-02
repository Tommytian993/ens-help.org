from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from api.serializers import LoginSerializer

# Create your views here.

class LoginView(APIView):
    """
    登录视图
    
    设计思路：
    - 接收 POST 请求，包含用户名和密码
    - 使用序列化器验证输入数据
    - 使用 Django 的 authenticate 验证用户
    - 如果验证成功，返回用户信息
    - 如果验证失败，返回错误信息
    """
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            
            # 验证用户
            user = authenticate(username=username, password=password)
            
            if user:
                # 登录成功，返回用户信息
                return Response({
                    'success': True,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                    }
                }, status=status.HTTP_200_OK)
            else:
                # 登录失败
                return Response({
                    'success': False,
                    'message': '用户名或密码错误'
                }, status=status.HTTP_401_UNAUTHORIZED)
        
        # 数据验证失败
        return Response({
            'success': False,
            'message': '请提供用户名和密码',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
