
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
    <div>
      <h1>Internship Project</h1>
      <Signup />
      <Login />
function App() {
  return (
    <div>
      <h1>Insurance CRC Project</h1>
    </div>
  );
}

export default App;
=======
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./features/admin/pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Insurance CRC Project</h1>} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

