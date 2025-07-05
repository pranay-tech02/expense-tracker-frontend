// components/ExpenseList.js
import React, { useState } from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses, onDelete, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', amount: '', category: '' });

  const startEditing = (exp) => {
    setEditingId(exp._id);
    setEditData({ title: exp.title, amount: exp.amount, category: exp.category });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({ title: '', amount: '', category: '' });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/expenses/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      const data = await res.json();
      if (res.ok) {
        onUpdate(data);
        cancelEditing();
      } else {
        alert(data.message || 'Failed to update');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  return (
    <div className="expense-list">
      <h3>Expenses</h3>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul>
          {expenses.map((exp) =>
            editingId === exp._id ? (
              <li key={exp._id} className="expense-item">
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                  <input
                    type="number"
                    value={editData.amount}
                    onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editData.category}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  />
                  <button type="submit" className="btn">Save</button>
                  <button type="button" className="btn cancel" onClick={cancelEditing}>Cancel</button>
                </form>
              </li>
            ) : (
              <li key={exp._id} className="expense-item">
                <div className="expense-details">
                  <span><strong>{exp.title}</strong> - ₹{exp.amount}</span>
                  <small>{exp.category}</small>
                </div>
                <div className="expense-actions">
                  <button className="btn" onClick={() => startEditing(exp)}>Edit</button>
                  <button className="btn danger" onClick={() => onDelete(exp._id)}>Delete</button>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
