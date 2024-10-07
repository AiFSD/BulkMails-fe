import React from "react";
import "../styles/Help.css";



const Help = () => {
  return (
    <div className="help-container">
      <div className="hero-section">
        <h1 className="hero-title">How Can We Assist You?</h1>
        <p className="hero-subtitle">
          We’re here to help you navigate through any issues.
        </p>
      </div>
      <div className="content">
        <section className="info-section">
          <h2 className="section-title">Our Services</h2>
          <p className="section-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </section>
        <section className="contact-section">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            lacinia odio vitae vestibulum.
          </p>
        </section>
        <section className="faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit
            amet accumsan arcu.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Help;
