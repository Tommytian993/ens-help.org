import React from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import HealthLogPage from "./pages/HealthLogPage";
import MemorialPage from "./pages/MemorialPage";
import ForumPage from "./pages/ForumPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>ENS患者平台</h1>
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
            <NavLink to="/profile" className="nav-link">
              个人中心
            </NavLink>
            <NavLink to="/login" className="nav-link">
              登录
            </NavLink>
            <NavLink to="/register" className="nav-link">
              注册
            </NavLink>
          </nav>
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
