import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
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
            <Link to="/">首页</Link>
            <Link to="/map">地图</Link>
            <Link to="/health-log">健康日志</Link>
            <Link to="/memorial">纪念园</Link>
            <Link to="/forum">论坛</Link>
          </nav>
        </header>
        <main>
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
