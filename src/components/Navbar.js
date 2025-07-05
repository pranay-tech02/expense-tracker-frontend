// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav style={{ padding: '1rem', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <h2><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>ExpenseTracker</Link></h2>
      <div>
        {token ? (
          <>
            <Link to="/dashboard" style={{ marginRight: '1rem', color: '#fff' }}>Dashboard</Link>
            <Link to="/expenses" style={{ marginRight: '1rem', color: '#fff' }}>Expenses</Link>
            <button onClick={handleLogout} style={{ color: '#fff', background: 'transparent', border: 'none', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#fff' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
