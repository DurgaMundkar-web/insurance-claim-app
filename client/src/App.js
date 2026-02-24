import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recommendation from './pages/Recommendation';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Recommendation />} />
        <Route path="/recommendations" element={<Recommendation />} />
      </Routes>
    </Router>
  );
}

export default App;