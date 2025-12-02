import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
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
          </nav>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
