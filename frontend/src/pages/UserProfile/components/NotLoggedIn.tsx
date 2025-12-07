import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient-purple">
      <div
        className="card border-0 shadow-xl rounded-xl p-5 text-center"
        style={{ maxWidth: "400px" }}
      >
        <div className="icon-xl mb-4">🔒</div>
        <h2 className="h3 fw-bold text-dark mb-3">未登录</h2>
        <p className="text-muted mb-4">请先登录以查看个人中心</p>
        <Link
          to="/login"
          className="btn btn-lg rounded-3 px-4 py-2 fw-semibold btn-hover-lift text-white text-decoration-none border-0"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          去登录
        </Link>
      </div>
    </div>
  );
};

export default NotLoggedIn;
