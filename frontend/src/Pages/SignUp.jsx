import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";
import user_icon from "../Componants/Assets/person.png";
import email_icon from "../Componants/Assets/email.png";
import password_icon from "../Componants/Assets/password.png";
import { UserContext } from '../Context/UserContext';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);
        setName('');
        setEmail('');
        setPassword('');
      } else {
        // Automatically log in the user after successful signup
        login({ name: data.name || name, email });
        navigate('/');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  return (
    <div className="container">
      <div className="container-header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={handleSignup} className="inputs">
        <div className="input">
          <img src={user_icon} alt="User icon" />
          <input 
            type="text" 
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
