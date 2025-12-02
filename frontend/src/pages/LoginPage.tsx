import { useState } from "react";

const LoginPage = () => {
  // username: 存储用户输入的用户名，初始值为空字符串 ""
  // setUsername: 用于更新 username 的函数
  const [username, setUsername] = useState("");

  return (
    <div>
      <h2>登录</h2>
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

      {/* 显示当前输入的值（用于测试） */}
      <p>当前输入: {username || "(空)"}</p>
    </div>
  );
};

export default LoginPage;
