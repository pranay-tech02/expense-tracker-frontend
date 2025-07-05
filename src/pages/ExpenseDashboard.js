// pages/ExpenseDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import './ExpenseDashboard.css'; // CSS file
import ExpenseChart from '../components/ExpenseChart';
import Toast from '../components/Toast';

const ExpenseDashboard = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const fetchExpenses = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setExpenses(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAdd = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
    setToastMessage('Expense added successfully!');
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setExpenses((prev) => prev.filter((exp) => exp._id !== id));
        setToastMessage('Expense deleted successfully!'); // ✅ Moved here
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  const handleUpdate = (updatedExpense) => {
    setExpenses(expenses.map((exp) => (exp._id === updatedExpense._id ? updatedExpense : exp)));
    setToastMessage('Expense updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const totalSpent = expenses.reduce((total, exp) => total + Number(exp.amount), 0);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Expense Tracker</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <div className="dashboard-summary">
        <h2>Welcome to your Dashboard</h2>
        <p>Total Spent: ₹{totalSpent}</p>
      </div>

      <AddExpenseForm onAdd={handleAdd} />
      <ExpenseList expenses={expenses} onDelete={handleDelete} onUpdate={handleUpdate} />
      <ExpenseChart expenses={expenses} />

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </div>
  );
};

export default ExpenseDashboard;
