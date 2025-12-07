import AuthCard from "../../components/common/AuthCard";
import { useRegister } from "./hooks/useRegister";
import RegisterForm from "./components/RegisterForm";
import RegisterFooter from "./components/RegisterFooter";

const RegisterPage = () => {
  const { state, setState, handleRegister } = useRegister();

  const handleStateChange = (updates: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AuthCard
      icon="✨"
      title="创建账号"
      subtitle="加入 ENS 患者平台，开始您的健康之旅"
    >
      <RegisterForm
        state={state}
        onStateChange={handleStateChange}
        onSubmit={handleRegister}
      />
      <RegisterFooter />
    </AuthCard>
  );
};

export default RegisterPage;
