import { Link } from "react-router-dom";

const LoginFooter = () => {
  return (
    <div className="text-center mt-4 pt-4 border-top">
      <span className="text-muted small">还没有账号？ </span>
      <Link
        to="/register"
        className="text-decoration-none text-primary fw-semibold small"
      >
        立即注册
      </Link>
    </div>
  );
};

export default LoginFooter;
