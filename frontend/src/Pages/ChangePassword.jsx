import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

const ChangePassword = () => {
  const { user, updatePassword } = useContext(UserContext);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();
      if (data.success) {
        updatePassword(newPassword); // Update password in context
        alert("Password changed successfully!");
        navigate("/profile");
      } else {
        setError("Failed to change password. Try again.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <button
        onClick={handleConfirm}
        disabled={!newPassword || newPassword !== confirmPassword}
      >
        Confirm
      </button>
    </div>
  );
};

export default ChangePassword;
