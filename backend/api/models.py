from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    """
    用户扩展信息模型
    
    设计思路：
    - 使用 OneToOne 关系关联 Django 的 User 模型
    - 存储 User 模型没有的额外信息（头像、个人简介等）
    - 这样既保留了 Django User 的功能，又能扩展自定义字段
    """
    # OneToOne 关系：一个 User 对应一个 UserProfile
    # on_delete=models.CASCADE: 如果 User 被删除，Profile 也会被删除
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    
    # 可以添加的扩展字段（示例）：
    # avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)  # 头像
    # bio = models.TextField(blank=True, verbose_name="个人简介")  # 个人简介
    # phone = models.CharField(max_length=20, blank=True, verbose_name="手机号")  # 手机号
    
    # 时间戳
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "用户扩展信息"
        verbose_name_plural = "用户扩展信息"

    def __str__(self):
        return f"{self.user.username} 的扩展信息"
