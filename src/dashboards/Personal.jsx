import React from "react";
import { useAuth } from "../context/authContext"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faCrown } from "@fortawesome/free-solid-svg-icons"; 
import "../styles/Personal.css"; 
import { useNavigate } from "react-router-dom";

const Personal = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  
  const handleGoPremium = () => {
    navigate("/premium"); 
  };

  return (
    <div className="personal-wrapper">
      <h2>Personal Information</h2>
      {user ? (
        <div className="card personal-info-card text-center">
          <div className="profile-icon-container">
            {user.profileIcon === "user" && (
              <i className="fa-solid fa-user profile-icon"></i>
            )}
            {user.profileIcon === "smile" && (
              <i className="fa-regular fa-smile profile-icon"></i>
            )}
            {user.profileIcon === "robot" && (
              <i className="fa-solid fa-robot profile-icon"></i>
            )}
            {user.profileIcon === "alien" && (
              <i className="fa-solid fa-alien profile-icon"></i>
            )}
            {user.profileIcon === "cat" && (
              <i className="fa-solid fa-cat profile-icon"></i>
            )}
          </div>
          <div className="card-body">
            <div className="personal-info-row">
              <strong>First Name:</strong> {user.firstName}
            </div>
            <div className="personal-info-row">
              <strong>Last Name:</strong> {user.lastName}
            </div>
            <div className="personal-info-row">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="personal-info-row">
              <strong>Date of Birth:</strong>{" "}
              {user.dateOfBirth
                ? new Date(user.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </div>
            <div className="personal-info-row">
              <strong>Your Name For Us:</strong> {user.yourNameForUs || "N/A"}
            </div>
            <div className="personal-info-row">
              <strong>Profession:</strong> {user.profession || "N/A"}
            </div>
            <div className="personal-info-row">
              <strong>Interests:</strong> {user.interests?.join(", ") || "N/A"}
            </div>
            <div className="personal-info-row">
              <strong>Experience Level:</strong> {user.experienceLevel || "N/A"}
            </div>
            <div className="personal-info-row">
              <strong>Preferred Contact Time:</strong>{" "}
              {user.preferredContactTime || "N/A"}
            </div>
          </div>
          <div className="premium-alert">
            <FontAwesomeIcon icon={faCrown} className="premium-icon" />
            <h4>Note:</h4>
            <p>
              Unlock the <strong>Edit Option</strong> by upgrading to our
              Premium Version.
            </p>
            <button className="go-premium-btn" onClick={handleGoPremium}>
              Go to Premium Page
            </button>
          </div>
        </div>
      ) : (
        <p>No personal information available.</p>
      )}
    </div>
  );
};

export default Personal;
