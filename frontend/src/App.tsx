import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  NavLink,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import HealthLogPage from "./pages/HealthLogPage";
import MemorialPage from "./pages/MemorialPage";
import ForumPage from "./pages/ForumPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";

// 导航栏组件（需要访问登录状态和登出功能）
function Navigation() {
  // 检查用户是否已登录（从 localStorage 读取）
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 检查登录状态的函数
  const checkLoginStatus = () => {
    const userStr = localStorage.getItem("user");
    setIsLoggedIn(!!userStr); // !! 将值转换为布尔值（null/undefined -> false，其他 -> true）
  };

  // 组件加载时检查登录状态
  useEffect(() => {
    checkLoginStatus();

    // 监听 localStorage 的变化（当其他标签页登录/登出时，当前页面也会更新）
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    // 监听自定义事件（同标签页登录/登出时触发）
    const handleLoginStatusChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("loginStatusChanged", handleLoginStatusChange);

    // 清理事件监听器
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loginStatusChanged", handleLoginStatusChange);
    };
  }, []);

  // 登出功能
  const handleLogout = () => {
    // 清除 localStorage 中的用户信息
    localStorage.removeItem("user");
    // 触发自定义事件，通知其他组件更新登录状态
    window.dispatchEvent(new Event("loginStatusChanged"));
    // 更新登录状态
    setIsLoggedIn(false);
    // 跳转到首页
    navigate("/");
  };

  return (
    <nav>
      <NavLink to="/" className="nav-link">
        首页
      </NavLink>
      <NavLink to="/map" className="nav-link">
        地图
      </NavLink>
      <NavLink to="/health-log" className="nav-link">
        健康日志
      </NavLink>
      <NavLink to="/memorial" className="nav-link">
        纪念园
      </NavLink>
      <NavLink to="/forum" className="nav-link">
        论坛
      </NavLink>
      {/* 根据登录状态显示不同的导航项 */}
      {isLoggedIn ? (
        <>
          {/* 已登录：显示个人中心和登出 */}
          <NavLink to="/profile" className="nav-link">
            个人中心
          </NavLink>
          <button
            onClick={handleLogout}
            className="nav-link"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "inherit",
              fontSize: "inherit",
              padding: "0.5rem 1rem",
            }}
          >
            登出
          </button>
        </>
      ) : (
        <>
          {/* 未登录：显示登录和注册 */}
          <NavLink to="/login" className="nav-link">
            登录
          </NavLink>
          <NavLink to="/register" className="nav-link">
            注册
          </NavLink>
        </>
      )}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>ENS患者平台</h1>
          <Navigation />
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/health-log" element={<HealthLogPage />} />
            <Route path="/memorial" element={<MemorialPage />} />
            <Route path="/forum" element={<ForumPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
