'use client';

import React, { useState } from 'react';
import './styles.css'

import { FaHome, FaTachometerAlt, FaThLarge, FaPowerOff, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={handleToggleSidebar}>
          {isOpen ? <FaArrowLeft size={24} /> : <FaArrowRight size={24} />}
        </button>
      </div>
      <ul className="sidebar-nav">
        <li>
          <a href="/" className="nav-item">
            <FaHome size={28} />
            {isOpen && <span className="nav-text">Home</span>}
          </a>
        </li>
        <li>
          <a href="/dashboard" className="nav-item">
            <FaTachometerAlt size={28} />
            {isOpen && <span className="nav-text">Dashboard</span>}
          </a>
        </li>
        <li>
          <a href="/categories" className="nav-item">
            <FaThLarge size={28} />
            {isOpen && <span className="nav-text">Categories</span>}
          </a>
        </li>
        <li>
          <a href="#" className="nav-item">
            <FaPowerOff size={28} />
            {isOpen && <span className="nav-text">Logout</span>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
