import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page Imports
import Recommendation from './pages/Recommendation';
import AdminDashboard from './features/admin/pages/AdminDashboard';
// Assuming these are your Auth components - update paths as necessary
import Login from './components/auth/Login'; 
import Signup from './components/auth/Signup';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Client Routes */}
        <Route path="/" element={<Navigate to="/recommendations" />} />
        <Route path="/recommendations" element={<Recommendation />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Fallback for 404 - Optional */}
        <Route path="*" element={
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>404</h1>
            <p>Page not found</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;