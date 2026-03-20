<<<<<<< HEAD
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Repeat, 
  Stars, 
  FileText, 
  UserCircle,
  Shield
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  // Navigation items structure
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20}/>, path: '/dashboard' },
    { name: 'Policies', icon: <ShieldCheck size={20}/>, path: '/policies' },
    { name: 'Compare', icon: <Repeat size={20}/>, path: '/compare' },
    { name: 'Recommendations', icon: <Stars size={20}/>, path: '/recommendations' },
    { name: 'Claims', icon: <FileText size={20}/>, path: '/claims' },
    { name: 'Active Plan', icon: <Shield size={20}/>, path: '/active-plan' },
    { name: 'Profile', icon: <UserCircle size={20}/>, path: '/profile' },
  ];

  return (
    <aside className="sidebar-container">
      {/* Branding Section */}
      <div className="sidebar-brand">
        <h2 className="brand-logo">InsureHub</h2>
        <span className="brand-subtext">Client Portal</span>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-links">
        {menuItems.map((item) => (
<<<<<<< Updated upstream
=======
          <div key={item.name} className={`nav-item ${item.active ? 'active' : ''}`}>
            {item.icon}
            <span>{item.name}</span>
          </div>
=======
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
>>>>>>> Stashed changes
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span className="nav-link-icon">{item.icon}</span>
            <span className="nav-link-text">{item.name}</span>
          </NavLink>
<<<<<<< Updated upstream
=======
>>>>>>> c18de50 (added my feature folder and code)
>>>>>>> Stashed changes
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;