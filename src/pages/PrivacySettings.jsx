import React, { useState } from "react";
import "../styles/PrivacySettings.css";

const PrivacySettings = () => {
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [dataSharing, setDataSharing] = useState({
    analytics: false,
    marketing: false,
    thirdParty: false,
  });
  const [whoCanEmail, setWhoCanEmail] = useState("everyone");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = () => {
    
    setMessage("Privacy settings saved successfully!");
    setTimeout(() => setMessage(""), 4000); 
  };

  return (
    <div className="privacy-settings">
      <h2>Privacy Settings</h2>
      {message && <p className="success-message">{message}</p>}

      <div className="form-group">
        <label>Profile Visibility:</label>
        <select
          className="form-control"
          value={profileVisibility}
          onChange={(e) => setProfileVisibility(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="friends">Friends</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div className="form-group">
        <label>Data Sharing Preferences:</label>
        <div>
          <label>
            <input
              type="checkbox"
              checked={dataSharing.analytics}
              onChange={() =>
                setDataSharing({
                  ...dataSharing,
                  analytics: !dataSharing.analytics,
                })
              }
            />
            Share data for analytics
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={dataSharing.marketing}
              onChange={() =>
                setDataSharing({
                  ...dataSharing,
                  marketing: !dataSharing.marketing,
                })
              }
            />
            Share data for marketing purposes
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={dataSharing.thirdParty}
              onChange={() =>
                setDataSharing({
                  ...dataSharing,
                  thirdParty: !dataSharing.thirdParty,
                })
              }
            />
            Share data with third-party services
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Who can email you?</label>
        <select
          className="form-control"
          value={whoCanEmail}
          onChange={(e) => setWhoCanEmail(e.target.value)}
        >
          <option value="everyone">Everyone</option>
          <option value="friends">Friends only</option>
          <option value="no-one">No one</option>
        </select>
      </div>

      <div className="form-group">
        <label>Enable Two-Factor Authentication:</label>
        <input
          type="checkbox"
          checked={twoFactorAuth}
          onChange={() => setTwoFactorAuth(!twoFactorAuth)}
        />
        <span>{twoFactorAuth ? "Enabled" : "Disabled"}</span>
      </div>

      <button onClick={handleSave} className="btn btn-primary">
        Save Settings
      </button>
    </div>
  );
};

export default PrivacySettings;
