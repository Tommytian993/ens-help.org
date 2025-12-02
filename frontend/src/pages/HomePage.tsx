import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ textAlign: "left", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        🏥 ENS 患者平台
      </h1>
      <p style={{ fontSize: "18px", lineHeight: "1.6", marginBottom: "30px" }}>
        欢迎来到 Empty Nose Syndrome (ENS) 患者平台。这是一个为 ENS
        患者提供支持、 信息共享和社区交流的平台。
      </p>

      <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>平台功能</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>🗺️ 诊所地图</h3>
          <p>查看全国 ENS 诊所分布，找到离您最近的医疗机构。</p>
          <NavLink
            to="/map"
            className="nav-link"
            style={{ display: "inline-block", marginTop: "10px" }}
          >
            查看地图 →
          </NavLink>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>📊 健康日志</h3>
          <p>记录和管理您的健康数据，追踪症状变化。</p>
          <NavLink
            to="/health-log"
            className="nav-link"
            style={{ display: "inline-block", marginTop: "10px" }}
          >
            开始记录 →
          </NavLink>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>💬 患者论坛</h3>
          <p>与其他患者交流经验，分享治疗心得。</p>
          <NavLink
            to="/forum"
            className="nav-link"
            style={{ display: "inline-block", marginTop: "10px" }}
          >
            进入论坛 →
          </NavLink>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>🕯️ 纪念园</h3>
          <p>纪念逝去的患者，表达我们的敬意和怀念。</p>
          <NavLink
            to="/memorial"
            className="nav-link"
            style={{ display: "inline-block", marginTop: "10px" }}
          >
            查看纪念园 →
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
