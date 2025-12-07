import { Link } from "react-router-dom";

const RegisterFooter = () => {
  return (
    <div className="text-center mt-4 pt-4 border-top">
      <span className="text-muted small">已有账号？ </span>
      <Link
        to="/login"
        className="text-decoration-none text-primary fw-semibold small"
      >
        立即登录
      </Link>
    </div>
  );
};

export default RegisterFooter;
