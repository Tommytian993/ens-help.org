from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    """
    用户扩展信息模型
    
    设计思路：
    - 使用 OneToOne 关系关联 Django 的 User 模型
    - 存储 User 模型没有的额外信息（头像、个人简介、角色、认证状态等）
    - 这样既保留了 Django User 的功能，又能扩展自定义字段
    """
    
    # ========== 角色相关 ==========
    # 角色选择：患者、认证医生、管理员等
    ROLE_CHOICES = [
        ('patient', '患者'),
        ('doctor', '认证医生'),
        ('admin', '管理员'),
    ]
    
    # 用户角色：默认为患者
    # choices=ROLE_CHOICES: 限制只能选择预定义的角色
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='patient',
        verbose_name="用户角色"
    )
    
    # ========== 认证状态相关 ==========
    # 认证状态选择：未认证、待审核、已认证
    VERIFICATION_STATUS_CHOICES = [
        ('unverified', '未认证'),
        ('pending', '待审核'),  # 已提交材料，等待审核
        ('verified', '已认证'),  # 审核通过
    ]
    
    # 认证状态：默认为未认证
    # 患者需要上传 CT 等证明材料，管理员审核后更新状态
    verification_status = models.CharField(
        max_length=20,
        choices=VERIFICATION_STATUS_CHOICES,
        default='unverified',
        verbose_name="认证状态"
    )
    
    # 认证材料（CT 图片等）：存储文件路径
    # upload_to='verification_docs/': 文件保存在 media/verification_docs/ 目录
    # blank=True, null=True: 允许为空（未上传材料时）
    verification_documents = models.FileField(
        upload_to='verification_docs/',
        blank=True,
        null=True,
        verbose_name="认证材料"
    )
    
    # 认证备注：管理员审核时的备注信息
    verification_notes = models.TextField(
        blank=True,
        null=True,
        verbose_name="认证备注"
    )
    
    # ========== 基础关系 ==========
    # OneToOne 关系：一个 User 对应一个 UserProfile
    # on_delete=models.CASCADE: 如果 User 被删除，Profile 也会被删除
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    
    # 可以添加的扩展字段（示例）：
    # avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)  # 头像
    # bio = models.TextField(blank=True, verbose_name="个人简介")  # 个人简介
    # phone = models.CharField(max_length=20, blank=True, verbose_name="手机号")  # 手机号
    
    # ========== 时间戳 ==========
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")

    class Meta:
        verbose_name = "用户扩展信息"
        verbose_name_plural = "用户扩展信息"

    def __str__(self):
        return f"{self.user.username} 的扩展信息"
