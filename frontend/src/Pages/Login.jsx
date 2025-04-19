import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import email_icon from "../Componants/Assets/email.png";
import password_icon from "../Componants/Assets/password.png";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        setEmail('');
        setPassword('');
      } else {
        login({ email: data.email });
        navigate('/');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  return (
    <div className="container">
      <div className="container-header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <form onSubmit={handleLogin}>
          <div className="input">
            <img src={email_icon} alt="Email icon" />
            <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input">
            <img src={password_icon} alt="Password icon" />
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
          Don't have an account? 
          <Link to="/SignUp" className="link">
            <span> Sign up </span>
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Login;
