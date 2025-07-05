// components/ExpenseSummary.js
import React from 'react';

const ExpenseSummary = ({ expenses }) => {
  if (!Array.isArray(expenses)) {
    return <p>No expenses data available</p>; // Display a message if expenses is not an array
  }

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div style={{ marginTop: '20px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
      <h3>Total Spent: ₹{total}</h3>
    </div>
  );
};

export default ExpenseSummary;
