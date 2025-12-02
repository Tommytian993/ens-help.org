import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>React + Django + PostgreSQL</h1>
          <p>基础项目框架</p>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
