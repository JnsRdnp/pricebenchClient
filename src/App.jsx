import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import GiganttiPCs from '../pages/GiganttiPCs';
import ValuePage from '../pages/ValuePage';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on link click (mobile)
  const handleLinkClick = () => setSidebarOpen(false);

  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar */}
        <nav
          className={`d-flex flex-column p-3 text-white position-fixed top-0 start-0 vh-100
            bg-gradient d-md-flex
            ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
          style={{
            minWidth: '220px',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            userSelect: 'none',
            boxShadow: '3px 0 8px rgba(0,0,0,0.2)',
            zIndex: 1050,
            transition: 'transform 0.3s ease',
          }}
        >
          <h5
            style={{
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '1.5rem',
              userSelect: 'none',
            }}
          >
            Menu
          </h5>
          <ul className="nav nav-pills flex-column gap-2">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  'nav-link text-white rounded px-3 py-2' +
                  (isActive ? ' bg-primary fw-bold' : ' text-opacity-75')
                }
                style={{
                  transition: 'background-color 0.3s, color 0.3s',
                }}
              >
                Gigantti PCs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/value"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  'nav-link text-white rounded px-3 py-2' +
                  (isActive ? ' bg-primary fw-bold' : ' text-opacity-75')
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

        {/* Overlay to close sidebar on mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 1040,
            }}
          />
        )}

        {/* Main content area */}
        <main
          className="flex-grow-1 p-4 bg-white"
          style={{
            minHeight: '100vh',
            marginLeft: '220px',
            transition: 'margin-left 0.3s ease',
          }}
        >
          {/* Hamburger button visible only on small screens */}
          <button
            className="btn btn-primary d-md-none mb-3"
            onClick={() => setSidebarOpen(true)}
          >
            ☰ Menu
          </button>

          <Routes>
            <Route path="/" element={<GiganttiPCs />} />
            <Route path="/value" element={<ValuePage />} />
          </Routes>
        </main>

        {/* Styles to handle sidebar open/close on mobile */}
        <style>{`
          /* Hide sidebar by moving it left when closed on mobile */
          nav.sidebar-closed {
            transform: translateX(-100%);
          }
          nav.sidebar-open {
            transform: translateX(0);
          }
          /* On desktop, sidebar is always visible and fixed */
          @media (min-width: 768px) {
            nav.sidebar-closed,
            nav.sidebar-open {
              transform: none !important;
              position: sticky;
              top: 0;
            }
            main {
              margin-left: 220px !important;
            }
          }
          /* On mobile, main content margin-left is 0 */
          @media (max-width: 767.98px) {
            main {
              margin-left: 0 !important;
            }
          }
          /* Gradient background class */
          .bg-gradient {
            background: linear-gradient(180deg, #1e1e2f 0%, #3a3a5a 100%) !important;
            color: #fff !important;
          }
        `}</style>
      </div>
    </Router>
  );
}
