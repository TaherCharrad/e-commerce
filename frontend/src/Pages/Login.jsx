import React, { useState, useContext } from 'react';
import './Login.css';
import { UserContext } from '../Context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import email_icon from '../Componants/Assets/email.png';
import password_icon from '../Componants/Assets/password.png';

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data.user);

      if (response.ok) {
        login( data.user );
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="container">
      <div className="container-header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <form onSubmit={handleSubmit}>
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit">Login</button>
        </form>

        <h2>
          Don't have an account?{' '}
          <Link to="/signup" className="link">
            <span>Sign up</span>
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Login;
