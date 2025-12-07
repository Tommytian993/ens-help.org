import { Link } from "react-router-dom";

interface RememberMeProps {
  rememberMe: boolean;
  onChange: (rememberMe: boolean) => void;
}

const RememberMe = ({ rememberMe, onChange }: RememberMeProps) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <label className="form-check-label d-flex align-items-center text-muted small" style={{ cursor: "pointer" }}>
        <input
          type="checkbox"
          className="form-check-input me-2"
          checked={rememberMe}
          onChange={(e) => onChange(e.target.checked)}
          style={{ width: "18px", height: "18px", cursor: "pointer" }}
        />
        记住我
      </label>
      <Link
        to="/forgot-password"
        className="text-decoration-none text-primary fw-medium small"
      >
        忘记密码？
      </Link>
    </div>
  );
};

export default RememberMe;
