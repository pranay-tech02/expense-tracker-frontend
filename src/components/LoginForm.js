import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.name);
        onLoginSuccess();
        navigate('/dashboard');
      } else {
        setErrorMsg(data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMsg('Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {errorMsg && <p className="error">{errorMsg}</p>}
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>

        <p style={{ marginTop: '10px' }}>
          Don’t have an account?{' '}
          <button type="button" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
