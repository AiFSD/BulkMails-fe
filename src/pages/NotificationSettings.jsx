import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotificationSettings.css";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [notificationSound, setNotificationSound] = useState("default");
  const [volume, setVolume] = useState(50);
  const [darkMode, setDarkMode] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
   
    navigate("/settings", {
      state: { message: "Settings saved successfully!" },
    });
  };

  return (
    <div className="notification-settings">
      <h2>Notification Settings</h2>

      <div className="form-group">
        <label>Notification Sound:</label>
        <select
          className="form-control"
          value={notificationSound}
          onChange={(e) => setNotificationSound(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="chime">Chime</option>
          <option value="alert">Alert</option>
          <option value="ping">Ping</option>
          <option value="ding">Ding</option>
          <option value="none">None</option>
        </select>
      </div>

      <div className="form-group">
        <label>Volume:</label>
        <input
          type="range"
          className="form-control"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{ borderRadius: "10px" }}
        />
        <span>{volume}%</span>
      </div>

      <div className="form-group toggle">
        <label>Dark Mode:</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
          />
          Email Notifications
        </label>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={smsNotifications}
            onChange={() => setSmsNotifications(!smsNotifications)}
          />
          SMS Notifications
        </label>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={pushNotifications}
            onChange={() => setPushNotifications(!pushNotifications)}
          />
          Push Notifications
        </label>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={newsletter}
            onChange={() => setNewsletter(!newsletter)}
          />
          Subscribe to Newsletter
        </label>
      </div>

      <div className="form-group">
        <label>Custom Message:</label>
        <textarea
          className="form-control"
          rows="3"
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Enter your custom message here..."
        ></textarea>
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
};

export default NotificationSettings;
