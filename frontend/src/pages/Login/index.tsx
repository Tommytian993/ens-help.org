import AuthCard from "../../components/common/AuthCard";
import { useLogin } from "./hooks/useLogin";
import LoginForm from "./components/LoginForm";
import LoginFooter from "./components/LoginFooter";

const LoginPage = () => {
  const { state, setState, handleLogin } = useLogin();

  const handleStateChange = (updates: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AuthCard icon="🏥" title="欢迎回来" subtitle="登录您的 ENS 患者平台账号">
      <LoginForm
        state={state}
        onStateChange={handleStateChange}
        onSubmit={handleLogin}
      />
      <LoginFooter />
    </AuthCard>
  );
};

export default LoginPage;
