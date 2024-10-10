import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "../styles/Registration.css";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customName, setCustomName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [interests, setInterests] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [preferredContactTime, setPreferredContactTime] = useState("");
  const [newsletterSubscription, setNewsletterSubscription] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://bulkmails-be-1.onrender.com/api/register",
        {
          firstName,
          lastName,
          email,
          password,
          customName,
          dateOfBirth,
          selectedIcon,
          interests: interests.split(",").map((interest) => interest.trim()),
          experienceLevel,
          marketingConsent,
          preferredContactTime,
          newsletterSubscription,
        }
      );
      console.log(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error(
          "There was an error registering the user!",
          error.message
        );
      }
    }
  };

  return (
    <div className="registration-page">
      <Container fluid>
        <Row>
          <Col xs={12} md={6} lg={4} className="registration-form">
            <h2>Register Now</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="customName">
                <Form.Label>Your Name for Us</Form.Label>
                <Form.Control
                  type="text"
                  value={customName}
                  onChange={(event) => setCustomName(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={dateOfBirth}
                  onChange={(event) => setDateOfBirth(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="selectedIcon">
                <Form.Label>Select an Icon</Form.Label>
                <div>
                  <select
                    value={selectedIcon}
                    onChange={(event) => setSelectedIcon(event.target.value)}
                  >
                    <option value="">Choose an icon</option>
                    <option value="user">User</option>
                    <option value="smile">Smile</option>
                    <option value="robot">Robot</option>
                    <option value="alien">Alien</option>
                    <option value="cat">Cat</option>
                  </select>
                  <div className="icon-container">
                    {selectedIcon === "user" && (
                      <i className="fa-solid fa-user"></i>
                    )}
                    {selectedIcon === "smile" && (
                      <i className="fa-regular fa-smile"></i>
                    )}
                    {selectedIcon === "robot" && (
                      <i className="fa-solid fa-robot"></i>
                    )}
                    {selectedIcon === "alien" && (
                      <i className="fa-solid fa-alien"></i>
                    )}
                    {selectedIcon === "cat" && (
                      <i className="fa-solid fa-cat"></i>
                    )}
                  </div>
                </div>
              </Form.Group>

              <Form.Group controlId="interests">
                <Form.Label>Interests (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  value={interests}
                  onChange={(event) => setInterests(event.target.value)}
                  placeholder="e.g., reading, traveling, music"
                />
              </Form.Group>

              <Form.Group controlId="experienceLevel">
                <Form.Label>Experience Level</Form.Label>
                <Form.Control
                  as="select"
                  value={experienceLevel}
                  onChange={(event) => setExperienceLevel(event.target.value)}
                >
                  <option value="">Select your experience level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="marketingConsent">
                <Form.Check
                  type="checkbox"
                  label="I consent to receive marketing emails"
                  checked={marketingConsent}
                  onChange={(event) =>
                    setMarketingConsent(event.target.checked)
                  }
                />
              </Form.Group>

              <Form.Group controlId="preferredContactTime">
                <Form.Label>Preferred Contact Time</Form.Label>
                <Form.Control
                  as="select"
                  value={preferredContactTime}
                  onChange={(event) =>
                    setPreferredContactTime(event.target.value)
                  }
                >
                  <option value="">Select your preferred contact time</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="newsletterSubscription">
                <Form.Check
                  type="checkbox"
                  label="Subscribe to newsletter"
                  checked={newsletterSubscription}
                  onChange={(event) =>
                    setNewsletterSubscription(event.target.checked)
                  }
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>

            <p className="mt-3">
              Already have an account?{" "}
              <Link to="/login" style={{ color: "white" }}>
                Log in here
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registration;
