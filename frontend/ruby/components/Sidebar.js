'use client'

import React, { useState } from 'react';
import './styles.css'

import { FaHome, FaMusic, FaSmile, FaSignOutAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={handleToggleSidebar}>
          {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>
      <ul className="sidebar-nav">
        <li>
          <a href="/" className="nav-item">
            <FaHome />
            {isOpen && <span className="nav-text">Home</span>}
          </a>
        </li>
        <li>
          <a href="/dashboard" className="nav-item">
            <FaMusic />
            {isOpen && <span className="nav-text">Dashboard</span>}
          </a>
        </li>
        <li>
          <a href="/categories" className="nav-item">
            <FaSmile />
            {isOpen && <span className="nav-text">Categories</span>}
          </a>
        </li>
        <li>
          <a href="#" className="nav-item">
            <FaSignOutAlt />
            {isOpen && <span className="nav-text">Logout</span>}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
