// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseDashboard from './ExpenseDashboard';

const Dashboard = ({ onLogout }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        onLogout();
        navigate('/');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Unauthorized');

        const data = await res.json();
        setName(data.name);
      } catch (err) {
        onLogout();
        navigate('/');
      }
    };

    fetchDashboard();
  }, [onLogout, navigate]);

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">
        HeLlO, {name || 'User'} 👋
      </h2>

      <ExpenseDashboard />

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
