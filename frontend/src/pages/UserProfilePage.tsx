/**
 * 用户个人中心页面
 *
 * 功能：
 * 1. 显示当前登录用户的基本信息（用户名、邮箱等）
 * 2. 从 localStorage 读取用户信息（登录时保存的）
 * 3. 如果未登录，显示提示信息
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
    return <div>未登录，请先登录</div>;
  }

  // 如果用户已登录，显示用户信息
  return (
    <div>
      <h2>个人中心</h2>
      {/* 显示用户名 */}
      <p>用户名: {user.username}</p>
      {/* 显示邮箱，如果邮箱为空则显示"未设置" */}
      <p>邮箱: {user.email || "未设置"}</p>
    </div>
  );
};

export default UserProfilePage;
