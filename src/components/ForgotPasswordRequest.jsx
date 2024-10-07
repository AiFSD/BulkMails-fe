import React, { useState } from "react";

const ForgotPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    const response = await fetch(
      "http://localhost:5000/api/auth/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );


      if (response.ok) {
        setSuccessMessage("Password reset email sent!");
        setEmail(""); 
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2>Forgot   
 Password</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email Address:</label>
                  <input
                    type="email"
                    className="form-control"   

                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>   

                {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
                {successMessage && <p className="alert alert-success">{successMessage}</p>}
                <button type="submit"   
 className="btn btn-primary">
                  Send Reset Link
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordRequest;


