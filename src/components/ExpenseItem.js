// components/ExpenseItem.js
import React from 'react';

const ExpenseItem = ({ expense, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '8px' }}>
      <h4>{expense.title}</h4>
      <p>
        Amount: ₹{expense.amount} ({expense.type})
      </p>
      <button onClick={() => onDelete(expense._id)}>Delete</button>
    </div>
  );
};

export default ExpenseItem;
