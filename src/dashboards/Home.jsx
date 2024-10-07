import React from "react";
import { Link } from "react-router-dom";
import NewsTicker from "../features/NewsTicker";

const Home = () => {
  const messages = [
    "Welcome to my page!",
    "Here are some instructions to get you started...",
    "Explore our premium features for more benefits!",
  ];

  return (
    <div className="container mt-4">
      <h3 style={{ textAlign: "center", color: "#333", margin: "20px 0" }}>
        Before you proceed,{" "}
        <span style={{ color: "#007bff", fontWeight: "bold" }}>
          take a moment to explore this page.
        </span>
        It will help you{" "}
        <span style={{ color: "#28a745", fontWeight: "bold" }}>
          understand the application
        </span>{" "}
        and empower you to
        <span style={{ color: "#dc3545", fontWeight: "bold" }}>
          {" "}
          use it easily and effectively!
        </span>
      </h3>
      <br />
      <NewsTicker messages={messages} />
      <br />
      <br />
      <h1 className="text-center mb-4">Welcome !</h1>

      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
            <div className="card-body" style={{ backgroundColor: "#e7f3ff" }}>
              <h3
                className="card-title"
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Advantages of Tracking Emails
              </h3>
              <p className="card-text">
                Tracking emails is crucial for ensuring that your messages are
                delivered and read. With our advanced tracking capabilities,
                gain valuable insights into delivery status and improve your
                overall communication strategy.
              </p>
              <p className="card-text">
                Our tracking feature offers real-time monitoring, helping you
                understand what happens after you hit "Send." Stay informed and
                enhance your engagement with recipients.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
            <div className="card-body" style={{ backgroundColor: "#fce4ec" }}>
              <h5
                className="card-title"
                style={{
                  backgroundColor: "#d81b60",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                User-Friendly Setup
              </h5>
              <p className="card-text">
                This app is designed with a simple and user-friendly setup,
                making it easy to navigate and use, regardless of your technical
                background.
              </p>
              <p className="card-text">
                Whether you're sending bulk emails or tracking individual
                deliveries, our intuitive interface guides you at every step,
                ensuring a seamless experience for all users.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
            <div className="card-body" style={{ backgroundColor: "#e8f5e9" }}>
              <h5
                className="card-title"
                style={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Explore the Application
              </h5>
              <p className="card-text">
                Learn more about how to use this application by accessing the
                full documentation. Understand each feature in detail, and make
                the most of its powerful capabilities to enhance your email
                communication.
              </p>
              <Link
                to="/explore"
                className="btn btn-primary"
                style={{
                  borderRadius: "25px",
                  padding: "10px 20px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                Go to Documentation
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm" style={{ borderRadius: "15px" }}>
            <div className="card-body" style={{ backgroundColor: "#fff3e0" }}>
              <h5
                className="card-title"
                style={{
                  backgroundColor: "#ff9800",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Explore the Code
              </h5>
              <p className="card-text">
                Dive into the technical side by exploring the underlying code.
                Understand the architecture, how each component functions, and
                the best practices that have been implemented for optimal
                performance.
              </p>
              <Link
                to="/codes"
                className="btn btn-secondary"
                style={{
                  borderRadius: "25px",
                  padding: "10px 20px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                Go to Code Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center mt-5 p-3">
        <p>
          Support | Reach us out | Help Center | FAQs | Contact Us | Feedback |
          Terms of Service | Privacy Policy | Blog | Careers
        </p>
      </footer>
    </div>
  );
};

export default Home;
