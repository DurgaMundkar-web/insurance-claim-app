import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recommendation from './pages/Recommendation';

function App() {
  return (
    <Router>
      <Routes>
        {/* जेव्हा तुम्ही localhost:3000 उघडाल, तेव्हा थेट शिफारस (Recommendation) पेज दिसेल */}
        <Route path="/" element={<Recommendation />} />
        <Route path="/recommendations" element={<Recommendation />} />
      </Routes>
    </Router>
  );
}

export default App;