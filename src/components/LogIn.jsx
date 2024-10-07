// components / LogIn.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext"; 
import "../styles/LogIn.css";






const LogIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues = {
    email: "",
    password: "",
  };

const onSubmit = async (values) => {
  console.log("Login button pressed!");
  try {
    const response = await axios.post("http://localhost:5000/login", values);
    console.log("Response data:", response.data);

    const { token, userId, ...userData } = response.data;

    login(token, { ...userData, userId });
    console.log("User after login:", { ...userData, userId }); 

    setTimeout(() => {
      navigate("/home", { replace: true });
    }, 100);
  } catch (error) {
    console.error("Login error:", error);
  }
};





  return (
    <div className="login-wrapper">
      <div className="login-background"></div>
      <div className="login-form">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <div className="form-group">
              <label htmlFor="email">E-MAIL</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Your email goes here"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="***********"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <p>
                Don't have an account? ➡️{" "}
                <Link to="/register">Register here</Link>
              </p>
            </div>

            <button type="submit" className="submit-btn">
              LOG IN
            </button>
          </Form>
        </Formik>
      </div>
      <div>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};
export default LogIn;
