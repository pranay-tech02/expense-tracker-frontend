// components/AddExpenseForm.js
import React, { useState } from 'react';
import './AddExpenseForm.css';

const AddExpenseForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount || !category) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/expenses/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, amount, category }),
      });

      const data = await res.json();

      if (res.ok) {
        onAdd(data);
        setTitle('');
        setAmount('');
        setCategory('');
        setError('');
      } else {
        setError(data.message || 'Error adding expense');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h3>Add New Expense</h3>
      {error && <p className="error-text">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit" className="btn">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
