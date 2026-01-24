import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import Report from './Report.jsx'
import Navbar from './components/Navbar.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/code3">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/radiocall" replace />} />
        <Route path="/radiocall" element={<App />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
