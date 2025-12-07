import { LoginState } from "../types";
import FormInput from "../../../components/common/FormInput";
import SubmitButton from "../../../components/common/SubmitButton";
import ErrorMessage from "../../../components/common/ErrorMessage";
import RememberMe from "./RememberMe";

interface LoginFormProps {
  state: LoginState;
  onStateChange: (updates: Partial<LoginState>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm = ({ state, onStateChange, onSubmit }: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <FormInput
        label="用户名"
        value={state.username}
        onChange={(value) =>
          onStateChange({ username: value, errorMessage: null })
        }
        onFocus={() => onStateChange({ focusedField: "username" })}
        onBlur={() => onStateChange({ focusedField: null })}
        placeholder="请输入用户名"
        icon="👤"
        focused={state.focusedField === "username"}
        required
      />

      <FormInput
        label="密码"
        type="password"
        value={state.password}
        onChange={(value) =>
          onStateChange({ password: value, errorMessage: null })
        }
        onFocus={() => onStateChange({ focusedField: "password" })}
        onBlur={() => onStateChange({ focusedField: null })}
        placeholder="请输入密码"
        icon="🔒"
        showPasswordToggle
        showPassword={state.showPassword}
        onTogglePassword={() =>
          onStateChange({ showPassword: !state.showPassword })
        }
        focused={state.focusedField === "password"}
        required
      />

      <RememberMe
        rememberMe={state.rememberMe}
        onChange={(rememberMe) => onStateChange({ rememberMe })}
      />

      {state.errorMessage && <ErrorMessage message={state.errorMessage} />}

      <SubmitButton
        isLoading={state.isLoading}
        text="登录"
        loadingText="登录中..."
      />
    </form>
  );
};

export default LoginForm;
