import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GiganttiPCs from '../pages/GiganttiPCs';
import ValuePage from '../pages/ValuePage';

export default function App() {
  return (
    <Router>
      <div className="d-flex">
        <nav className="flex-column bg-light p-3" style={{ minWidth: '220px', minHeight: '100vh' }}>
          <h5>Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/">Gigantti PCs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/value">CPU & GPU Value</Link>
            </li>
          </ul>
        </nav>

        <main className="flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<GiganttiPCs />} />
            <Route path="/value" element={<ValuePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

