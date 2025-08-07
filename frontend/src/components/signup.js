import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-page modern">
      <div className="auth-container">
        <h2 className="auth-title">Sign Up</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="auth-input"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p className="auth-switch">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
