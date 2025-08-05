import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { WatchlistPage } from './components/WatchlistPage';
import { SettingsPage } from './components/SettingsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light">
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="position-absolute top-0 start-0 bg-primary text-white p-2 text-decoration-none"
          style={{ transform: 'translateY(-100%)', zIndex: 9999 }}
          onFocus={(e) => e.target.style.transform = 'translateY(0)'}
          onBlur={(e) => e.target.style.transform = 'translateY(-100%)'}
        >
          Skip to main content
        </a>
        
        <Navigation />
        
        <main id="main-content" className="flex-grow-1" role="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          role="alert"
          aria-live="polite"
        />
      </div>
    </Router>
  );
}