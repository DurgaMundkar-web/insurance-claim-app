// client/src/layout/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: '⊞', path: '/dashboard' },
    { name: 'Policies', icon: '📋', path: '/policies' },
    { name: 'Compare', icon: '⇄', path: '/compare' },
    { name: 'Recommendations', icon: '✨', path: '/recommendations' },
    { name: 'Claims', icon: '📄', path: '/claims' },
    { name: 'Active Plan', icon: '🛡️', path: '/active-plan' },
    { name: 'Profile', icon: '👤', path: '/profile' },
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar-brand">
        <h2 className="brand-logo">InsureHub</h2>
        <span className="brand-subtext">Client Portal</span>
      </div>

      <nav className="sidebar-links">
        {menuItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span className="nav-link-icon">{item.icon}</span>
            <span className="nav-link-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;