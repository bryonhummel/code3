import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import App from './App.jsx'
import Report from './Report.jsx'
import Navbar from './components/Navbar.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Navbar />
      <div className="nav-content mx-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/radiocall" replace />} />
          <Route path="/radiocall" element={<App />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </HashRouter>
  </React.StrictMode>,
);
