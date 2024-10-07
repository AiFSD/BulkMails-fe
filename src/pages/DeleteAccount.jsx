import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DeleteAccount = () => {
  const { user } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDelete = () => {
    if (!isChecked) {
      setErrors({ checkbox: "Please check the box to confirm" });
    } else {
      // Display success message
      setSuccessMessage("User deleted successfully!");

      // Redirect to register page after 2 seconds
      setTimeout(() => {
        navigate("/register");
      }, 2000);
    }
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="container">
      <h1 className="mt-5">Delete Your Account</h1>
      <br />
      <br />
      <h5>
        We’re sorry to see you go! Please read the information below carefully.
      </h5>

      <div className="d-flex justify-content-center mt-5">
        <div
          className="card border-success mb-3"
          style={{
            maxWidth: "18rem",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <div className="card-body text-success">
            <div className="text-center">
              {user.profileIcon === "user" && (
                <i
                  className="fa-solid fa-user"
                  style={{ fontSize: "100px" }}
                ></i>
              )}
              {user.profileIcon === "smile" && (
                <i
                  className="fa-regular fa-smile"
                  style={{ fontSize: "100px" }}
                ></i>
              )}
              {user.profileIcon === "robot" && (
                <i
                  className="fa-solid fa-robot"
                  style={{ fontSize: "100px" }}
                ></i>
              )}
              {user.profileIcon === "alien" && (
                <i
                  className="fa-solid fa-alien"
                  style={{ fontSize: "100px" }}
                ></i>
              )}
              {user.profileIcon === "cat" && (
                <i
                  className="fa-solid fa-cat"
                  style={{ fontSize: "100px" }}
                ></i>
              )}
              <h5 className="card-title mt-3">
                {user.firstName} {user.lastName}
              </h5>
              <p className="card-text">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <h6 className="text-danger">Warning!</h6>
      <p>
        Deleting your account is permanent and will erase all your data,
        including your profile, posts, messages, and settings.
      </p>
      <ul>
        <li>Loss of access to all associated services.</li>
        <li>Deletion of all personal data and preferences.</li>
        <li>You will not be able to recover any data after deletion.</li>
      </ul>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="confirmDelete"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label
          className="form-check-label text-dark font-weight-bold"
          htmlFor="confirmDelete"
        >
          I understand that my account will be permanently deleted and cannot be
          recovered.
        </label>
        {errors.checkbox && (
          <div style={{ color: "red" }}>{errors.checkbox}</div>
        )}
      </div>
      <div className="mt-3">
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete My Account
        </button>
        <button
          className="btn btn-secondary ml-2"
          onClick={() => navigate("/register")} // Redirect to register directly
        >
          Cancel
        </button>
      </div>

      {successMessage && (
        <div className="mt-3 text-success">{successMessage}</div>
      )}
    </div>
  );
};

export default DeleteAccount;
