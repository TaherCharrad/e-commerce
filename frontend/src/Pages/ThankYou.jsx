import React from 'react';
import { Link } from 'react-router-dom';
import './ThankYou.css';

const ThankYou = () => {
  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <h1>Thank You for Your Purchase!</h1>
        <p>Your order has been placed successfully.</p>
        <p>You will receive an email confirmation shortly.</p>
        <Link to="/" className="home-button">Back to Home</Link>
      </div>
    </div>
  );
};

export default ThankYou;
