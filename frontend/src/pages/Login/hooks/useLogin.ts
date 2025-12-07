import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/api";
import { LoginState } from "../types";

export const useLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<LoginState>({
    username: "",
    password: "",
    errorMessage: null,
    isLoading: false,
    showPassword: false,
    rememberMe: false,
    focusedField: null,
  });

  useEffect(() => {
    const remembered = localStorage.getItem("rememberedUsername");
    if (remembered) {
      setState((prev) => ({
        ...prev,
        username: remembered,
        rememberMe: true,
      }));
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.username.trim()) {
      setState((prev) => ({ ...prev, errorMessage: "请输入用户名" }));
      return;
    }
    if (!state.password.trim()) {
      setState((prev) => ({ ...prev, errorMessage: "请输入密码" }));
      return;
    }

    setState((prev) => ({ ...prev, errorMessage: null, isLoading: true }));

    try {
      const result = await login(state.username, state.password);

      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.user));

        if (state.rememberMe) {
          localStorage.setItem("rememberedUsername", state.username);
        } else {
          localStorage.removeItem("rememberedUsername");
        }

        window.dispatchEvent(new Event("loginStatusChanged"));
        navigate("/");
      } else {
        setState((prev) => ({
          ...prev,
          errorMessage: result.message || "登录失败，请重试",
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
    handleLogin,
  };
};
