// src/App.js

import React from 'react';
import './App.css'; // Keep the CSS import
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// 1. Import your main page component
// Make sure the path is correct based on where you placed it
import HomePage from './HomePage';
import Checkout from './pages/Checkout';

// You can also import and arrange individual components if you prefer
// import Header26 from './components/Header26';
// import Cta52 from './components/Cta52';
// import Footer5 from './components/Footer5';

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
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* You can add more routes here as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;