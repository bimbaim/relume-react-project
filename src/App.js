// src/App.js

import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your main page components
import HomePage from './HomePage';
import Checkout from './pages/Checkout';

// 1. Import the new HealthCheck component
import HealthCheck from './components/HealthCheck';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-blue-600 p-4 shadow-md">
          <ul className="flex justify-center space-x-8">
            <li>
              <Link to="/" className="text-white hover:text-blue-200 text-lg font-medium transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/checkout" className="text-white hover:text-blue-200 text-lg font-medium transition duration-300">Checkout</Link>
            </li>
          </ul>
        </nav>

        <main className="flex-grow container mx-auto p-4 flex items-center justify-center">
          <Routes>
            {/* Your existing routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* 2. Add the new route for the health check */}
            <Route path="/health" element={<HealthCheck />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;