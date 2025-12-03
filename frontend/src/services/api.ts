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

// 第五步：添加注册 API 方法
// 这个函数接收用户名、密码和邮箱（可选），发送 POST 请求到后端注册接口
export const register = async (
  username: string,
  password: string,
  email?: string
) => {
  // 发送 POST 请求到 /api/auth/register/
  // 请求体包含用户名、密码和邮箱（如果有）
  const response = await api.post("/api/auth/register/", {
    username: username,
    password: password,
    email: email || "", // 如果提供了邮箱就使用，否则为空字符串
  });
  // 返回响应数据（包含 success 和 user 信息）
  return response.data;
};

export default api;
