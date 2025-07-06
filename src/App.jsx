import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import GiganttiPCs from '../pages/GiganttiPCs';
import ValuePage from '../pages/ValuePage';

export default function App() {
  return (
    <Router>
      <div className="d-flex">
        <nav
          className="d-flex flex-column p-3"
          style={{
            minWidth: '220px',
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #1e1e2f 0%, #3a3a5a 100%)',
            color: '#fff',
            boxShadow: '3px 0 8px rgba(0,0,0,0.2)',
            position: 'sticky',
            top: 0,
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            userSelect: 'none',
          }}
        >
          <h5 style={{ textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>
            Menu
          </h5>
          <ul className="nav nav-pills flex-column gap-2">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  'nav-link text-white rounded px-3 py-2' + (isActive ? ' bg-primary fw-bold' : ' text-opacity-75')
                }
                style={{
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              >
                {/* You could add icons here with <span> or react-icons */}
                Gigantti PCs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/value"
                className={({ isActive }) =>
                  'nav-link text-white rounded px-3 py-2' + (isActive ? ' bg-primary fw-bold' : ' text-opacity-75')
                }
                style={{
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              >
                CPU & GPU Value
              </NavLink>
            </li>
          </ul>
          <div style={{ marginTop: 'auto', fontSize: '0.8rem', opacity: 0.6 }}>
            &copy; 2025 Your Company
          </div>
        </nav>

        <main className="flex-grow-1 p-4 bg-white" style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<GiganttiPCs />} />
            <Route path="/value" element={<ValuePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}