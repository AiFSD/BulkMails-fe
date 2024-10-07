import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/SettingsPage.css";

const SettingsPage = () => {
  const location = useLocation();
  const [showMessage, setShowMessage] = useState(false);

  const handleChangePasswordClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  useEffect(() => {
    if (location.state?.message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      {showMessage && (
        <div className="warning-message">
          <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
          For your safety, we recommend using the "Forgot Password" option.
          Thank you!
        </div>
      )}

      <ul className="settings-list">
        <li>
          <button
            onClick={handleChangePasswordClick}
            className="change-password-btn"
          >
            Change Password
          </button>
        </li>
        <li>
          <Link to="/change-username">Change User Name</Link>
        </li>
        <li>
          <Link to="/delete-account">Delete Account </Link>
        </li>
        <li>
          <Link to="/edit-profile">Edit Profile</Link>
        </li>
        <li>
          <Link to="/privacy-settings">Privacy Settings</Link>
        </li>
        <li>
          <Link to="/notification-settings">Notifications</Link>
        </li>
        <li>
          <Link to="/language-settings">Language Settings</Link>
        </li>
      </ul>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus rerum
        ea placeat quis eos nihil doloremque inventore eius, amet exercitationem
        assumenda error voluptatem suscipit deserunt necessitatibus voluptatibus
        ipsam tempora in vitae ex quo temporibus quam. Magnam repudiandae
        voluptates itaque nisi similique unde reprehenderit possimus assumenda
        in ut, hic asperiores amet.
      </p>
    </div>
  );
};

export default SettingsPage;
