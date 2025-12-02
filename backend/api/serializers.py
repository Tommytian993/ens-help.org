from rest_framework import serializers

# Create your serializers here.

class LoginSerializer(serializers.Serializer):
    """
    登录序列化器
    
    设计思路：
    - username: 用户名（必填）
    - password: 密码（必填，write_only=True 表示只用于输入，不会在响应中返回）
    """
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
