import { RegisterState } from "../types";
import FormInput from "../../../components/common/FormInput";
import SubmitButton from "../../../components/common/SubmitButton";
import ErrorMessage from "../../../components/common/ErrorMessage";

interface RegisterFormProps {
  state: RegisterState;
  onStateChange: (updates: Partial<RegisterState>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RegisterForm = ({
  state,
  onStateChange,
  onSubmit,
}: RegisterFormProps) => {
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
        placeholder="请输入用户名（至少3个字符）"
        icon="👤"
        focused={state.focusedField === "username"}
        required
      />

      <FormInput
        label="邮箱"
        type="email"
        value={state.email}
        onChange={(value) =>
          onStateChange({ email: value, errorMessage: null })
        }
        onFocus={() => onStateChange({ focusedField: "email" })}
        onBlur={() => onStateChange({ focusedField: null })}
        placeholder="请输入邮箱地址"
        icon="📧"
        focused={state.focusedField === "email"}
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
        placeholder="请输入密码（至少6个字符）"
        icon="🔒"
        showPasswordToggle
        showPassword={state.showPassword}
        onTogglePassword={() =>
          onStateChange({ showPassword: !state.showPassword })
        }
        focused={state.focusedField === "password"}
        required
      />

      <FormInput
        label="确认密码"
        type="password"
        value={state.confirmPassword}
        onChange={(value) =>
          onStateChange({ confirmPassword: value, errorMessage: null })
        }
        onFocus={() => onStateChange({ focusedField: "confirmPassword" })}
        onBlur={() => onStateChange({ focusedField: null })}
        placeholder="请再次输入密码"
        icon="🔒"
        showPasswordToggle
        showPassword={state.showConfirmPassword}
        onTogglePassword={() =>
          onStateChange({
            showConfirmPassword: !state.showConfirmPassword,
          })
        }
        focused={state.focusedField === "confirmPassword"}
        required
      />

      {state.errorMessage && <ErrorMessage message={state.errorMessage} />}

      <SubmitButton
        isLoading={state.isLoading}
        text="注册"
        loadingText="注册中..."
      />
    </form>
  );
};

export default RegisterForm;
