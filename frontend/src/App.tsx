import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import HealthLogPage from "./pages/HealthLog";
import MemorialPage from "./pages/Memorial";
import ForumPage from "./pages/Forum";
import ResourceCenterPage from "./pages/ResourceCenter";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import UserProfilePage from "./pages/UserProfile";
import NavLinkItem from "./components/common/NavLinkItem";

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
    <nav className="d-flex align-items-center gap-2 flex-wrap">
      <NavLinkItem to="/">首页</NavLinkItem>
      <NavLinkItem to="/map">地图</NavLinkItem>
      <NavLinkItem to="/health-log">健康日志</NavLinkItem>
      <NavLinkItem to="/memorial">纪念园</NavLinkItem>
      <NavLinkItem to="/forum">论坛</NavLinkItem>
      <NavLinkItem to="/resources">资料中心</NavLinkItem>
      {/* 根据登录状态显示不同的导航项 */}
      {isLoggedIn ? (
        <>
          <NavLinkItem to="/profile">个人中心</NavLinkItem>
          <button
            onClick={handleLogout}
            className="btn btn-sm rounded-2 px-3 py-2 fw-semibold btn-hover-lift text-white border-0"
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              boxShadow: "0 2px 10px rgba(240, 147, 251, 0.3)",
            }}
          >
            登出
          </button>
        </>
      ) : (
        <>
          <NavLinkItem to="/login">登录</NavLinkItem>
          <NavLinkItem to="/register">注册</NavLinkItem>
        </>
      )}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header
          className="bg-white shadow-sm sticky-top py-3"
          style={{ zIndex: 1000 }}
        >
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <h1 className="h4 mb-0 text-gradient fw-bold">🏥 ENS患者平台</h1>
              <Navigation />
            </div>
          </div>
        </header>
        <main className="min-vh-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/health-log" element={<HealthLogPage />} />
            <Route path="/memorial" element={<MemorialPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/resources" element={<ResourceCenterPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
