// src/App.js

import React from 'react';
import './App.css'; // Keep the CSS import

// 1. Import your main page component
// Make sure the path is correct based on where you placed it
import HomePage from './HomePage';

// You can also import and arrange individual components if you prefer
// import Header26 from './components/Header26';
// import Cta52 from './components/Cta52';
// import Footer5 from './components/Footer5';

function App() {
  return (
    // You can keep the main div or remove it
    <div className="App">
      
      {/* 2. Render your HomePage component */}
      <HomePage />

      {/* Or, if you want to assemble the page here, you can render them like this: */}
      {/* <Header26 />
      <Cta52 />
      <Footer5 /> */}

    </div>
  );
}

export default App;