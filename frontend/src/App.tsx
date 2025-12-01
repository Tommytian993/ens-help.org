import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MapPage from './pages/MapPage';
import MemorialPage from './pages/MemorialPage';
import ForumPage from './pages/ForumPage';
import HealthLogPage from './pages/HealthLogPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>🏥 ENS 患者平台</h1>
          <p>Empty Nose Syndrome Patient Platform</p>
          <nav>
            <Link to="/" className="nav-link">🗺️ 诊所地图</Link>
            <Link to="/memorial" className="nav-link">🕯️ 患者纪念园</Link>
            <Link to="/forum" className="nav-link">💬 患者论坛</Link>
            <Link to="/health-log" className="nav-link">📊 健康日志</Link>
          </nav>
        </header>

        <main className="App-main">
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/memorial" element={<MemorialPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/health-log" element={<HealthLogPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
