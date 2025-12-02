import React from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import HealthLogPage from "./pages/HealthLogPage";
import MemorialPage from "./pages/MemorialPage";
import ForumPage from "./pages/ForumPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>React + Django + PostgreSQL</h1>
          <p>基础项目框架</p>
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
          </nav>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
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
