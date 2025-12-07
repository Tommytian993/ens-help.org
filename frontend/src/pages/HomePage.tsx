import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const features = [
    {
      icon: "🗺️",
      title: "诊所地图",
      description: "查看全国 ENS 诊所分布，找到离您最近的医疗机构。",
      link: "/map",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      icon: "📊",
      title: "健康日志",
      description: "记录和管理您的健康数据，追踪症状变化。",
      link: "/health-log",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      icon: "💬",
      title: "患者论坛",
      description: "与其他患者交流经验，分享治疗心得。",
      link: "/forum",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      icon: "🕯️",
      title: "纪念园",
      description: "纪念逝去的患者，表达我们的敬意和怀念。",
      link: "/memorial",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      icon: "📚",
      title: "资料中心",
      description: "查找 ENS 相关文献、指南和资料，获取最新研究信息。",
      link: "/resources",
      color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
  ];

  return (
    <div className="min-vh-100 bg-gradient-secondary py-5">
      {/* 英雄区域 */}
      <div className="container text-center mb-5 py-5">
        <div className="icon-xl mb-4 animate-fade-in-down">
          🏥
        </div>
        <h1 className="display-3 fw-bold text-gradient mb-4 animate-fade-in-down" style={{ animationDelay: "0.2s" }}>
          ENS 患者平台
        </h1>
        <p className="lead text-muted mx-auto mb-4 animate-fade-in-down" style={{ maxWidth: "600px", animationDelay: "0.4s" }}>
          欢迎来到 Empty Nose Syndrome (ENS) 患者平台。这是一个为 ENS
          患者提供支持、信息共享和社区交流的平台。
        </p>
        {!user && (
          <div className="animate-fade-in-down" style={{ animationDelay: "0.6s" }}>
            <NavLink
              to="/register"
              className="btn btn-lg btn-primary rounded-3 px-4 py-3 fw-semibold btn-hover-lift text-white text-decoration-none"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              }}
            >
              立即注册 →
            </NavLink>
          </div>
        )}
      </div>

      {/* 功能卡片网格 */}
      <div className="container">
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={feature.link} className="col-md-6 col-lg-4">
              <div
                className="card h-100 border-0 shadow-sm rounded-xl card-hover"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  cursor: "pointer",
                }}
                onClick={() => (window.location.href = feature.link)}
              >
                <div className="card-body p-4">
                  <div
                    className="d-inline-block p-3 rounded-3 mb-4"
                    style={{
                      fontSize: "48px",
                      background: feature.color,
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="h4 fw-bold text-dark mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted mb-4 lh-base">
                    {feature.description}
                  </p>
                  <NavLink
                    to={feature.link}
                    className="text-decoration-none text-primary fw-semibold d-inline-flex align-items-center"
                  >
                    了解更多 →
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
