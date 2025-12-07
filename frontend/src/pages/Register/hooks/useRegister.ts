import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../services/api";
import { RegisterState } from "../types";

export const useRegister = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<RegisterState>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    errorMessage: null,
    isLoading: false,
    showPassword: false,
    showConfirmPassword: false,
    focusedField: null,
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.username.trim()) {
      setState((prev) => ({ ...prev, errorMessage: "请输入用户名" }));
      return;
    }
    if (state.username.length < 3) {
      setState((prev) => ({
        ...prev,
        errorMessage: "用户名至少需要3个字符",
      }));
      return;
    }
    if (!state.password.trim()) {
      setState((prev) => ({ ...prev, errorMessage: "请输入密码" }));
      return;
    }
    if (state.password.length < 6) {
      setState((prev) => ({
        ...prev,
        errorMessage: "密码至少需要6个字符",
      }));
      return;
    }
    if (state.password !== state.confirmPassword) {
      setState((prev) => ({
        ...prev,
        errorMessage: "两次输入的密码不一致",
      }));
      return;
    }

    setState((prev) => ({ ...prev, errorMessage: null, isLoading: true }));

    try {
      const result = await register(
        state.username,
        state.password,
        state.email || undefined
      );

      if (result.success) {
        navigate("/login", {
          state: { message: "注册成功！请登录" },
        });
      } else {
        setState((prev) => ({
          ...prev,
          errorMessage: result.message || "注册失败，请重试",
        }));
      }
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        errorMessage: error.response?.data?.message || "网络错误，请稍后重试",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return {
    state,
    setState,
    handleRegister,
  };
};
