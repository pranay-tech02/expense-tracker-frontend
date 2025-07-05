// components/ExpenseChart.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

const ExpenseChart = ({ expenses }) => {
  if (!expenses || expenses.length === 0) return <p style={{ marginTop: "20px" }}>No chart data available.</p>;

  // 1. Prepare Pie Chart data (by category)
  const categoryMap = {};
  expenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + Number(e.amount);
  });
  const pieData = Object.entries(categoryMap).map(([category, value]) => ({
    name: category,
    value,
  }));

  // 2. Prepare Bar Chart data (by title)
  const barData = expenses.map((e) => ({
    name: e.title,
    amount: Number(e.amount),
  }));

  return (
    <div style={{ marginTop: '30px', background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 0 6px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginBottom: '20px' }}>Expense Charts</h3>

      {/* Pie Chart */}
      <h4>By Category</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Bar Chart */}
      <h4 style={{ marginTop: '30px' }}>By Title</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
