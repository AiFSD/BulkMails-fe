import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {}, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    console.log("Token:", token);
    console.log("New Password:", newPassword);

    try {
      const response = await fetch(
        `https://bulkmails-be-1.onrender.com/api/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Password updated successfully!");
        navigate("/login");
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h2>Reset Password</h2>
            </div>
            <div className="card-body">
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="newPassword" className="form-label text-dark">
                    New Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    style={{ backgroundColor: "#fff", color: "#000" }}
                  />
                </div>
                <div className="form-group mb-3">
                  <label
                    htmlFor="confirmPassword"
                    className="form-label text-dark"
                  >
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ backgroundColor: "#fff", color: "#000" }}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
