import { useState } from "react";

const RegisterPage = () => {
  // 添加状态管理
  // username: 存储用户输入的用户名
  const [username, setUsername] = useState("");
  // password: 存储用户输入的密码
  const [password, setPassword] = useState("");

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

      <p>用户名: {username || "(空)"}</p>
      <p>密码: {password ? "***" : "(空)"}</p>
    </div>
  );
};

export default RegisterPage;
