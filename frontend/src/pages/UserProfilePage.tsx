/**
 * 用户个人中心页面
 *
 * 功能：
 * 1. 显示当前登录用户的基本信息（用户名、邮箱等）
 * 2. 显示用户角色（患者/认证医生/管理员）
 * 3. 显示认证状态（未认证/待审核/已认证）
 * 4. 从 localStorage 读取用户信息（登录时保存的）
 * 5. 如果未登录，显示提示信息
 */
const UserProfilePage = () => {
  // 从 localStorage 读取用户信息
  // localStorage 是浏览器提供的本地存储，数据会持久保存（即使关闭浏览器）
  // 登录时，LoginPage 会将用户信息保存到 localStorage
  const userStr = localStorage.getItem("user");

  // 将 JSON 字符串转换为 JavaScript 对象
  // 如果 userStr 为 null（未登录），则 user 为 null
  const user = userStr ? JSON.parse(userStr) : null;

  // 如果用户未登录（user 为 null），显示提示信息
  if (!user) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>个人中心</h2>
        <p>未登录，请先登录</p>
      </div>
    );
  }

  // 获取用户角色和认证状态（从 profile 中读取，如果没有则使用默认值）
  const profile = user.profile || {};
  const role = profile.role_display || "患者";
  const verificationStatus = profile.verification_status_display || "未认证";
  const verificationStatusValue = profile.verification_status || "unverified";

  // 根据认证状态设置显示样式和提示信息
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "verified":
        return { color: "#28a745", fontWeight: "bold" }; // 绿色：已认证
      case "pending":
        return { color: "#ffc107", fontWeight: "bold" }; // 黄色：待审核
      case "unverified":
      default:
        return { color: "#6c757d", fontWeight: "normal" }; // 灰色：未认证
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "verified":
        return "您的身份已通过认证";
      case "pending":
        return "您的认证材料正在审核中，请耐心等待";
      case "unverified":
      default:
        return "您尚未提交认证材料，如需认证请上传相关材料";
    }
  };

  // 如果用户已登录，显示用户信息
  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h2>个人中心</h2>

      {/* 基本信息卡片 */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>基本信息</h3>
        <p>
          <strong>用户名：</strong>
          {user.username}
        </p>
        <p>
          <strong>邮箱：</strong>
          {user.email || "未设置"}
        </p>
        <p>
          <strong>用户ID：</strong>
          {user.id}
        </p>
      </div>

      {/* 角色和认证状态卡片 */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>角色与认证</h3>
        <p>
          <strong>角色：</strong>
          {role}
        </p>
        <p>
          <strong>认证状态：</strong>
          <span style={getStatusStyle(verificationStatusValue)}>
            {verificationStatus}
          </span>
        </p>
        <p
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#fff",
            borderRadius: "4px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          {getStatusMessage(verificationStatusValue)}
        </p>
      </div>

      {/* 提示信息 */}
      {verificationStatusValue === "unverified" && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            color: "#856404",
          }}
        >
          <strong>提示：</strong>
          如果您是患者，需要上传 CT 等证明材料进行认证。认证通过后，您将获得更多功能权限。
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
