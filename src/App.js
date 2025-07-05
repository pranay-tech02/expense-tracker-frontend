import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './pages/Dashboard';
import ExpenseDashboard from './pages/ExpenseDashboard';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Home />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<SignupForm />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Expenses */}
        <Route
          path="/expenses"
          element={
            isAuthenticated ? (
              <ExpenseDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
