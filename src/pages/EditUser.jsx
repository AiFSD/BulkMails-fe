import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../styles/EditForm.css";

const EditUser = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    yourNameForUs: "",
    profession: "",
    interests: "",
    experienceLevel: "",
    preferredContactTime: "",
    profileIcon: "",
    marketingConsent: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
        yourNameForUs: user.yourNameForUs || "",
        profession: user.profession || "",
        interests: user.interests.join(", ") || "",
        experienceLevel: user.experienceLevel || "",
        preferredContactTime: user.preferredContactTime || "",
        profileIcon: user.profileIcon || "",
        marketingConsent: user.marketingConsent || false,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth.split("T")[0],
      };

      const response = await fetch(
        `https://bulkmails-be-1.onrender.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        navigate("/personal");
      } else {
        console.error("Failed to update user", await response.json());
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <h2>Edit User</h2>

      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />

      <label htmlFor="dateOfBirth">Date of Birth:</label>
      <input
        type="date"
        id="dateOfBirth"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
      />

      <label htmlFor="profileIcon">Profile Icon:</label>
      <select
        id="profileIcon"
        name="profileIcon"
        value={formData.profileIcon}
        onChange={handleChange}
      >
        <option value="">Select Icon</option>
        <option value="user">User</option>
        <option value="smile">Smile</option>
        <option value="robot">Robot</option>
        <option value="alien">Alien</option>
        <option value="cat">Cat</option>
      </select>

      <label htmlFor="experienceLevel">Experience Level:</label>
      <input
        type="text"
        id="experienceLevel"
        name="experienceLevel"
        value={formData.experienceLevel}
        onChange={handleChange}
        placeholder="Experience Level"
      />

      <label htmlFor="preferredContactTime">Preferred Contact Time:</label>
      <select
        id="preferredContactTime"
        name="preferredContactTime"
        value={formData.preferredContactTime}
        onChange={handleChange}
      >
        <option value="">Select Time</option>
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Evening">Evening</option>
      </select>

      <label htmlFor="yourNameForUs">Your Name For Us:</label>
      <input
        type="text"
        id="yourNameForUs"
        name="yourNameForUs"
        value={formData.yourNameForUs}
        onChange={handleChange}
        placeholder="Your Name For Us"
      />

      <label htmlFor="interests">Interests:</label>
      <input
        type="text"
        id="interests"
        name="interests"
        value={formData.interests}
        onChange={handleChange}
        placeholder="Interests (e.g., reading, dancing)"
      />

      <label htmlFor="marketingConsent">Marketing Consent:</label>
      <input
        type="checkbox"
        id="marketingConsent"
        name="marketingConsent"
        checked={formData.marketingConsent}
        onChange={handleChange}
      />

      <button type="submit">Update</button>
    </form>
  );
};

export default EditUser;
