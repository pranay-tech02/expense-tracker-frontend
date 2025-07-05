// src/components/SignupForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg('Account created successfully. Redirecting to login...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMsg(data.message || 'Signup failed');
      }
    } catch (err) {
      setMsg('Something went wrong');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        {msg && <p>{msg}</p>}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account?{' '}
          <button type="button" onClick={() => navigate('/')}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
