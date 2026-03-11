<<<<<<< HEAD
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
=======
import React from 'react';
import './Sidebar.css';
import { LayoutDashboard, ShieldCheck, Repeat, Stars, FileText, UserCircle } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20}/> },
    { name: 'Policies', icon: <ShieldCheck size={20}/> },
    { name: 'Compare', icon: <Repeat size={20}/> },
    { name: 'Recommendations', icon: <Stars size={20}/>, active: true },
    { name: 'Claims', icon: <FileText size={20}/> },
    { name: 'Active Plans', icon: <ShieldCheck size={20}/> },
    { name: 'Profile', icon: <UserCircle size={20}/> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h2>InsureHub</h2>
        <p>Client Portal</p>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.name} className={`nav-item ${item.active ? 'active' : ''}`}>
            {item.icon}
            <span>{item.name}</span>
          </div>
>>>>>>> d71ab8d101a63c0ad838d9a49581f1f140cbee2f
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;