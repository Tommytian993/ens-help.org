import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>🏥 ENS 患者平台</h1>
      <p className="intro">
        欢迎来到 Empty Nose Syndrome (ENS) 患者平台。这是一个为 ENS
        患者提供支持、信息共享和社区交流的平台。
      </p>

      <h2>平台功能</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <h3>🗺️ 诊所地图</h3>
          <p>查看全国 ENS 诊所分布，找到离您最近的医疗机构。</p>
          <NavLink to="/map" className="nav-link card-link">
            查看地图 →
          </NavLink>
        </div>

        <div className="feature-card">
          <h3>📊 健康日志</h3>
          <p>记录和管理您的健康数据，追踪症状变化。</p>
          <NavLink to="/health-log" className="nav-link card-link">
            开始记录 →
          </NavLink>
        </div>

        <div className="feature-card">
          <h3>💬 患者论坛</h3>
          <p>与其他患者交流经验，分享治疗心得。</p>
          <NavLink to="/forum" className="nav-link card-link">
            进入论坛 →
          </NavLink>
        </div>

        <div className="feature-card">
          <h3>🕯️ 纪念园</h3>
          <p>纪念逝去的患者，表达我们的敬意和怀念。</p>
          <NavLink to="/memorial" className="nav-link card-link">
            查看纪念园 →
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
