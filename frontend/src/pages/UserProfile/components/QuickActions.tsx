import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <div className="card border-0 shadow-sm rounded-xl p-4">
      <h3 className="h5 fw-bold text-dark mb-4">
        ⚡ 快速操作
      </h3>
      <div className="row g-3">
        <div className="col-6 col-md-3">
          <Link
            to="/health-log"
            className="btn w-100 rounded-3 py-3 fw-semibold btn-hover-lift text-white text-decoration-none border-0"
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            }}
          >
            📊 健康日志
          </Link>
        </div>
        <div className="col-6 col-md-3">
          <Link
            to="/forum"
            className="btn w-100 rounded-3 py-3 fw-semibold btn-hover-lift text-white text-decoration-none border-0"
            style={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            }}
          >
            💬 患者论坛
          </Link>
        </div>
        <div className="col-6 col-md-3">
          <Link
            to="/memorial"
            className="btn w-100 rounded-3 py-3 fw-semibold btn-hover-lift text-white text-decoration-none border-0"
            style={{
              background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            }}
          >
            🕯️ 纪念园
          </Link>
        </div>
        <div className="col-6 col-md-3">
          <Link
            to="/resources"
            className="btn w-100 rounded-3 py-3 fw-semibold btn-hover-lift text-white text-decoration-none border-0"
            style={{
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            }}
          >
            📚 资料中心
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;

