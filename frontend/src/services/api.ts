import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 添加登录 API 方法
// 这个函数接收用户名和密码，发送 POST 请求到后端登录接口
export const login = async (username: string, password: string) => {
  // 发送 POST 请求到 /api/auth/login/
  // 请求体包含用户名和密码
  const response = await api.post("/api/auth/login/", {
    username: username,
    password: password,
  });
  // 返回响应数据（包含 success 和 user 信息）
  return response.data;
};

export default api;
