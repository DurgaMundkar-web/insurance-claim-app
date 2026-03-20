<<<<<<< Updated upstream
// Example of how your App.js or Layout should look
<div style={{ display: 'flex' }}>
  <Sidebar />
  <div style={{ flex: 1, marginLeft: '260px', backgroundColor: '#F8FAFB' }}>
    <Recommendation /> {/* Your page content */}
  </div>
</div>
=======
<<<<<<< HEAD
>>>>>>> Stashed changes
import React from 'react';
import Sidebar from './Sidebar';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content-area">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
<<<<<<< Updated upstream
=======
=======
// Example of how your App.js or Layout should look
<div style={{ display: 'flex' }}>
  <Sidebar />
  <div style={{ flex: 1, marginLeft: '260px', backgroundColor: '#F8FAFB' }}>
    <Recommendation /> {/* Your page content */}
  </div>
</div>
>>>>>>> c18de50 (added my feature folder and code)
>>>>>>> Stashed changes
