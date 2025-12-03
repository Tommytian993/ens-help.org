import { useState } from "react";
// 导入注册 API 方法
import { register } from "../services/api";

const RegisterPage = () => {
  // 添加状态管理
  // username: 存储用户输入的用户名
  const [username, setUsername] = useState("");
  // password: 存储用户输入的密码
  const [password, setPassword] = useState("");
  // 第七步：添加错误状态管理
  // errorMessage: 存储错误信息（比如"用户名已存在"）
  // 初始值为 null（表示没有错误）
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // 第八步：添加加载状态管理
  // isLoading: 表示是否正在注册中
  // true = 正在注册（显示"注册中..."）
  // false = 未在注册（显示"注册"按钮）
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <h2>注册</h2>

      {/* 添加用户名输入框 */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="username"
          style={{ display: "block", marginBottom: "5px" }}
        >
          用户名
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "300px",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* 添加密码输入框 */}
      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: "5px" }}
        >
          密码
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "300px",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* 添加注册按钮 */}
      <button
        type="button"
        onClick={async () => {
          // 调用注册 API
          // 先清除之前的错误信息
          setErrorMessage(null);
          // 设置加载状态为 true（开始加载）
          setIsLoading(true);

          try {
            // 调用 register 函数，传入用户名和密码
            // await 表示等待异步操作完成
            const result = await register(username, password);

            // 如果注册成功（result.success === true）
            if (result.success) {
              console.log("注册成功！", result.user);
              // 清除错误信息
              setErrorMessage(null);
              // TODO: 后续会添加跳转到登录页面或保存用户信息的逻辑
            } else {
              // 如果注册失败，设置错误信息
              setErrorMessage(result.message || "注册失败，请重试");
            }
          } catch (error: any) {
            // 如果请求出错（比如网络错误、服务器错误等）
            // 设置错误信息
            setErrorMessage(
              error.response?.data?.message || "网络错误，请稍后重试"
            );
          } finally {
            // 无论成功还是失败，都要设置加载状态为 false（结束加载）
            setIsLoading(false);
          }
        }}
        style={{
          width: "300px",
          padding: "10px",
          backgroundColor: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isLoading ? "not-allowed" : "pointer",
          fontSize: "16px",
          opacity: isLoading ? 0.6 : 1,
        }}
        disabled={isLoading}
      >
        {isLoading ? "注册中..." : "注册"}
      </button>

      {/* 第七步：显示错误信息 */}
      {/* 如果 errorMessage 不为空，显示错误提示 */}
      {errorMessage && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "#fee",
            color: "#c33",
            border: "1px solid #fcc",
            borderRadius: "4px",
          }}
        >
          {errorMessage}
        </div>
      )}

      <p>用户名: {username || "(空)"}</p>
      <p>密码: {password ? "***" : "(空)"}</p>
    </div>
  );
};

export default RegisterPage;
