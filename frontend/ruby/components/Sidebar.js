'use client';

import React, { useState } from 'react';
import { useClerk } from '@clerk/nextjs'; 
import './styles.css';
import { FaHome, FaTachometerAlt, FaThLarge, FaPowerOff, FaArrowLeft, FaArrowRight, FaSignInAlt, FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, openSignIn } = useClerk(); 
  const router = useRouter();

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSignInClick = () => {
    openSignIn();
  }

  const handleLogout = () => {
    signOut(); // Call the signOut function
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
  <div className="sidebar-header">
    <button className="toggle-btn" onClick={handleToggleSidebar}>
      {isOpen ? <FaArrowLeft size={24} /> : <FaArrowRight size={24} />}
    </button>
  </div>
  <ul className="sidebar-nav">
    {user && (
      <li className='nav-item'>
        <FaUserCircle size={36} className='user-icon' />
        {isOpen && (
          <span className='nav-text'>{user.firstName}</span>
        )}
      </li>
    )}
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
    {user ? (
      <li>
        <a href="/" className="nav-item" onClick={handleLogout}>
          <FaPowerOff size={28} />
          {isOpen && <span className="nav-text">Logout</span>}
        </a>
      </li>
    ) : (
      <li>
        <a href='#' className='nav-item' onClick={handleSignInClick}>
          <FaSignInAlt size={28} />
          {isOpen && <span className='nav-text'>Sign In</span>}
        </a>
      </li>
    )}
  </ul>
</div>
  );
};

export default Sidebar;
