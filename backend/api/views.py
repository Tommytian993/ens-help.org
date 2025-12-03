# 导入 Django REST Framework 的组件
from rest_framework import viewsets, status  # status 包含 HTTP 状态码（如 200, 401, 400）
from rest_framework.views import APIView  # APIView 是处理 API 请求的基础类
from rest_framework.response import Response  # Response 用于返回 JSON 格式的响应
from django.contrib.auth import authenticate  # authenticate 是 Django 内置的用户验证函数
from django.contrib.auth.models import User  # User 是 Django 内置的用户模型
from api.serializers import LoginSerializer, RegisterSerializer  # 导入登录和注册序列化器

# Create your views here.

class LoginView(APIView):
    """
    登录视图类
    
    这个类的作用：
    1. 接收前端发送的用户名和密码
    2. 验证这些数据是否正确
    3. 检查用户是否存在，密码是否匹配
    4. 返回登录结果（成功或失败）
    
    为什么继承 APIView？
    - APIView 提供了处理 HTTP 请求的基础功能
    - 我们可以定义 post() 方法来处理 POST 请求
    """
    
    def post(self, request):
        """
        处理 POST 请求的方法
        
        参数：
        - self: 类实例本身（Python 必需）
        - request: 包含前端发送的所有数据（用户名、密码等）
        
        流程：
        1. 验证输入数据格式
        2. 检查用户名和密码是否正确
        3. 返回结果
        """
        
        # 第一步：验证输入数据
        # LoginSerializer 会检查 request.data 中是否有 username 和 password
        # 如果没有或格式不对，会记录错误
        serializer = LoginSerializer(data=request.data)
        
        # 第二步：检查数据是否通过验证
        if serializer.is_valid():
            # 如果数据格式正确，提取用户名和密码
            username = serializer.validated_data['username']  # 从验证后的数据中获取用户名
            password = serializer.validated_data['password']  # 从验证后的数据中获取密码
            
            # 第三步：验证用户身份
            # authenticate() 是 Django 内置函数，会去数据库查找用户
            # 如果用户名和密码都正确，返回用户对象；否则返回 None
            user = authenticate(username=username, password=password)
            
            # 第四步：根据验证结果返回响应
            if user:
                # 情况1：用户验证成功（user 不是 None）
                # 返回成功信息和用户数据
                return Response({
                    'success': True,  # 标记登录成功
                    'user': {  # 返回用户信息（不包含密码）
                        'id': user.id,  # 用户ID
                        'username': user.username,  # 用户名
                        'email': user.email,  # 邮箱
                    }
                }, status=status.HTTP_200_OK)  # HTTP 200 表示请求成功
            else:
                # 情况2：用户验证失败（user 是 None，用户名或密码错误）
                # 返回失败信息
                return Response({
                    'success': False,  # 标记登录失败
                    'message': '用户名或密码错误'  # 错误提示
                }, status=status.HTTP_401_UNAUTHORIZED)  # HTTP 401 表示未授权（认证失败）
        
        # 情况3：输入数据格式不正确（比如缺少用户名或密码）
        # 返回数据验证错误
        return Response({
            'success': False,  # 标记失败
            'message': '请提供用户名和密码',  # 提示信息
            'errors': serializer.errors  # 详细的错误信息（比如哪个字段有问题）
        }, status=status.HTTP_400_BAD_REQUEST)  # HTTP 400 表示请求格式错误


class RegisterView(APIView):
    """
    注册视图类
    
    这个类的作用：
    1. 接收前端发送的用户名、密码、邮箱
    2. 验证这些数据是否正确
    3. 检查用户名是否已存在
    4. 创建新用户
    5. 返回注册结果（成功或失败）
    """
    
    def post(self, request):
        """
        处理 POST 请求的方法（注册请求）
        
        参数：
        - self: 类实例本身（Python 必需）
        - request: 包含前端发送的所有数据（用户名、密码、邮箱等）
        
        流程：
        1. 验证输入数据格式
        2. 检查用户名是否已存在
        3. 创建新用户
        4. 返回结果
        """
        
        # 第一步：验证输入数据
        # RegisterSerializer 会检查 request.data 中是否有 username、password、email
        serializer = RegisterSerializer(data=request.data)
        
        # 第二步：检查数据是否通过验证
        if serializer.is_valid():
            # 如果数据格式正确，提取数据
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            email = serializer.validated_data.get('email', '')  # email 是可选的，如果没有就使用空字符串
            
            # 第三步：检查用户名是否已存在
            if User.objects.filter(username=username).exists():
                # 如果用户名已存在，返回错误
                return Response({
                    'success': False,
                    'message': '用户名已存在，请选择其他用户名'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # 第四步：创建新用户
            # User.objects.create_user() 是 Django 提供的创建用户方法
            # 它会自动加密密码（不会明文存储）
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email if email else '',  # 如果提供了邮箱就使用，否则为空字符串
            )
            
            # 第五步：返回成功信息
            return Response({
                'success': True,
                'message': '注册成功',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                }
            }, status=status.HTTP_201_CREATED)  # HTTP 201 表示资源创建成功
        
        # 情况：输入数据格式不正确
        # 返回数据验证错误
        return Response({
            'success': False,
            'message': '请提供有效的注册信息',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
