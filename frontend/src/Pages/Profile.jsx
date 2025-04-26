import React, { useContext } from "react";
import "./Profile.css";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import defaultProfilePic from "../Componants/Assets/profile_icon.jpg";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (!user?.email) {
      alert("No user is logged in.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();

      if (response.ok) {
        logout();
        navigate("/");
      } else {
        console.error("Account deletion failed:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during account deletion:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={defaultProfilePic} alt="Profile" className="profile-pic" />
        {user?.name && <h2 className="user-name">{user.name}</h2>}

        <div className="profile-buttons">
          <Link to='/change_password' className="link">
            <button className="profile-button">
              Change Password
            </button>
          </Link>

          <button className="profile-button" onClick={handleLogout}>
            Log Out
          </button>

          <button className="profile-button delete" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;