import { useState } from "react";

const LoginPage = () => {
  // 第一步：添加状态管理
  // username: 存储用户输入的用户名，初始值为空字符串 ""
  // setUsername: 用于更新 username 的函数
  const [username, setUsername] = useState("");

  return (
    <div>
      <h2>登录</h2>
      <p>用户名状态: {username}</p>
    </div>
  );
};

export default LoginPage;
