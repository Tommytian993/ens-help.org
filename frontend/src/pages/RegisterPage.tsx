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

      {/* 添加注册按钮 */}
      <button
        type="button"
        onClick={() => {
          // TODO: 这里后续会添加调用后端 API 的逻辑
          console.log("点击注册按钮", { username, password });
        }}
        style={{
          width: "300px",
          padding: "10px",
          backgroundColor: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        注册
      </button>

      <p>用户名: {username || "(空)"}</p>
      <p>密码: {password ? "***" : "(空)"}</p>
    </div>
  );
};

export default RegisterPage;
