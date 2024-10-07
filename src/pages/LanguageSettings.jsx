import React, { useState } from "react";
import "../styles/LanguageSettings.css";

const LanguageSettings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [textSize, setTextSize] = useState("medium");
  const [message, setMessage] = useState("");

  const handleSave = () => {
   
    setMessage("Language settings saved successfully!");
    setTimeout(() => setMessage(""), 4000); 
  };

  return (
    <div className="language-settings">
      <h2>Language Settings</h2>
      {message && <p className="success-message">{message}</p>}

      <div className="form-group">
        <label>Select Language:</label>
        <select
          className="form-control"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Chinese">Chinese</option>
        </select>
      </div>

      <div className="form-group">
        <label>Text Size:</label>
        <select
          className="form-control"
          value={textSize}
          onChange={(e) => setTextSize(e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div className="form-group">
        <label>Language-Specific Settings:</label>
        <div>
          <label>
            <input
              type="checkbox"
              onChange={() => alert("Language-specific feature activated.")}
            />
            Enable language-specific features
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              onChange={() => alert("Auto-translation enabled.")}
            />
            Enable auto-translation for messages
          </label>
        </div>
      </div>

      <button onClick={handleSave} className="btn btn-primary">
        Save Settings
      </button>
    </div>
  );
};

export default LanguageSettings;
