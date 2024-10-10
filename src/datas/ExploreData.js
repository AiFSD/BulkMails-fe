// src/datas/ExploreData.js
const ExploreData = [
  {
    name: "TrackLogs",
    appDescription:
      "The TrackLogs page displays a list of tracked email events, allowing users to review specific email activities. Each entry shows the title, timestamp, and a button to view full data associated with each email event.",
    codeDescription:
      "The TrackLogs component fetches tracked email event data from an API using Axios. It manages loading states and ensures the data is an array before setting it in the state. Each tracked email event is displayed in a card format with relevant details, and users can navigate to a detailed view by clicking the 'View Full Data' button.",
    points: [
      "fetchTrackLogs Function: This function retrieves track logs from the server, fetching all logged events related to email activities. It's called when the TrackLogs component mounts to display the logs to the user.",
      "Code Integration: The fetchTrackLogs function is called within a useEffect hook, ensuring that the data is loaded when the component mounts. The logs are displayed in a user-friendly format, allowing users to view detailed information about each email event.",
    ],
    code: `
// controllers/TrackingControllers.js
const TrackingModel = require("../models/Tracking");

const savePayload = async (payload) => {
  try {
    const newPayload = new TrackingModel(payload);
    await newPayload.save();
    console.log("Payload saved successfully:", newPayload);
  } catch (error) {
    console.error("Error saving payload:", error);
  }
};

module.exports = {
  savePayload
};

// TrackLogs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "../styles/TrackLogs.css";

const TrackLogs = () => {
  const [trackLogs, setTrackLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchTrackLogs = async () => {
      try {
        const response = await axios.get("https://bulkmails-be-1.onrender.com/api/track-logs");
        setTrackLogs(response.data);
      } catch (error) {
        console.error("Error fetching track logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackLogs();
  }, []);

  const handleViewFullData = (log) => {
    navigate("/full-data", { state: { log } }); // Navigate to the full data page with log data
  };

  return (
    <div className="track-logs">
      <h2>Track Logs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="track-log-cards">
          {trackLogs.map((log) => (
            <div key={log._id} className="track-log-card">
              <h4>Title: {log.title}</h4>
              <p>Timestamp: {new Date(log.timestamp).toLocaleString()}</p>
              <button onClick={() => handleViewFullData(log)}>
                View Full Data
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackLogs;
`,
  },
  {
    name: "History",
    appDescription:
      "The History page displays a list of email events, allowing users to review their email activities. Each entry shows the subject, purpose, sender, recipient, timestamp, delivery status, and the count of recipients for each email event. Users can click 'View Mail' to navigate to a detailed view of the selected email.",
    codeDescription:
      "The History component fetches email event data from an API using Axios. It manages loading states and ensures the data is an array before setting it in the state. Each email event is displayed in a list format with relevant details, and users can navigate to a detailed mail view by clicking on the corresponding button.\n\n" +
      "fetchEmailEvents Function:\n" +
      "This function retrieves email events from the server, fetching up to 100 recent email events. It's called when the History component mounts to load and display the email events to the user.\n\n" +
      "Code Integration:\n" +
      "The fetchEmailEvents function is called within a useEffect hook, ensuring that the data is loaded when the component mounts. The events are displayed in a user-friendly format, allowing users to click 'View Mail' to see more details about each email event.",
    code: `// History.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/History.css"; // Import your CSS file

const History = () => {
  const [emailEvents, setEmailEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchEmailEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://bulkmails-be-1.onrender.com/api/email-events");
        const emailEventsData = response.data;
        if (Array.isArray(emailEventsData)) {
          setEmailEvents(emailEventsData);
        } else {
          console.error(
            "Email events data is not an array:",
            typeof emailEventsData,
            emailEventsData
          );
        }
      } catch (error) {
        console.error("Error fetching email events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailEvents();
  }, []);

  return (
    <div className="history-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="email-events-list">
          {emailEvents.map((emailEvent) => (
            <li key={emailEvent._id} className="email-event-card">
              <h2 className="field-name title">{emailEvent.subject}</h2>
              <p className="field-name purpose">Purpose: {emailEvent.body}</p>
              <p className="field-name from">From: {emailEvent.sender}</p>
              <p className="field-name to">To: {emailEvent.recipient}</p>
              <p className="field-name timestamp">
                Timestamp: {new Date(emailEvent.timestamp).toLocaleString()}
              </p>
              <p className="field-name status">
                Status: {emailEvent.deliveryStatus}
              </p>
              <p className="field-name recipient-count">
                Recipients Count: {emailEvent.recipient ? emailEvent.recipient.split(",").length : 0}
              </p>
              <button
                className="view-mail-button"
                onClick={() => navigate(\`/mail-details/\${emailEvent._id}\`)} // Navigate to MailDetails with email ID
              >
                View Mail
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;

// Route for fetching and logging email events
router.get("/email-events", async (req, res) => {
  try {
    const events = await mg.get("/events", { limit: 100 });

    const emailEvents = [];

    for (const event of events.items) {
      if (event.sender) {
        const existingEvent = await EmailEvent.findOne({
          recipient: event.recipient,
          timestamp: event.timestamp,
        });
        if (!existingEvent) {
          const emailEvent = new EmailEvent({
            eventType: event.event,
            sender: event.sender,
            recipient: event.recipient,
            deliveryStatus: event.delivery_status,
            timestamp: event.timestamp,
            subject: event.subject,
            body: event.body || "",
          });
          const savedEvent = await emailEvent.save();
          emailEvents.push(savedEvent);
        }
      }
    }

    const allEmailEvents = await EmailEvent.find().sort({ timestamp: -1 });
    res.status(200).json(allEmailEvents);
  } catch (error) {
    console.error("Error fetching and logging email events:", error);
    res.status(500).json({ message: "Error fetching and logging email events" });
  }
});`,
  },
  {
    name: "Status",
    appDescription:
      "The Status page presents a summary of email events, including timestamps, event types, senders, and delivery statuses. Users can track individual events by clicking the 'Track' button, which navigates them to the Track Logs page for more detailed information.",
    codeDescription:
      "The Status component fetches email event data from an API using Axios. It handles loading states, error handling, and displays the data in a structured table format. Each row represents an email event, and users can navigate to the Track Logs page using the provided button.\n\n" +
      "fetchMailgunLogs Function:\n" +
      "This function retrieves email logs from Mailgun, fetching up to 100 recent email events. It's used in the Status component to display the delivery status, timestamp, and event type for each email.\n\n" +
      "Code Integration:\n" +
      "The fetchMailgunLogs function would be called when the Status component is mounted to load and display the email logs from Mailgun. The logs will be displayed in the component’s table format, allowing users to track email status and events.",
    code: `
  

  // fetchMailgunLogs Function (located in emailControllers.js)
  const fetchMailgunLogs = async () => {
    try {
      const logs = await mg.events().list({ limit: 100 });
      return logs.items;
    } catch (error) {
      console.error("Error fetching Mailgun logs:", error);
      throw error;
    }
  };
  `,
  },
  {
    name: "Personal",
    appDescription:
      "The Personal page displays the user's personal information, including their profile icon, first name, last name, email, date of birth, and other relevant details. It also informs users about the premium features available for upgrading, specifically the option to edit their personal information.",
    codeDescription:
      "The Personal component utilizes the useAuth context to access user data. It conditionally renders the user's information or a message if no data is available. It includes a button for navigating to the Premium page, which allows users to unlock editing features by upgrading.\n\n" +
      "Conditional Rendering:\n" +
      "The component checks if user data exists. If available, it displays the user's personal details; otherwise, it shows a message indicating that no personal information is available.\n\n" +
      "Profile Icon:\n" +
      "The profile icon is dynamically displayed based on the user's chosen icon, enhancing the personalization of the user's profile.\n\n" +
      "Navigation to Premium Page:\n" +
      "A button allows users to navigate to the Premium page, where they can unlock additional editing features by upgrading their account.",
    code: `// Personal.jsx
import React from "react";
import { useAuth } from "../context/authContext"; // Import useAuth
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faCrown } from "@fortawesome/free-solid-svg-icons"; 
import "../styles/Personal.css"; 
import { useNavigate } from "react-router-dom";

const Personal = () => {
  const navigate = useNavigate(); // Use the hook to get the navigate function
  const { user } = useAuth(); // Access user data from context

  // Define the function to handle redirection
  const handleGoPremium = () => {
    navigate("/premium"); // Redirects to the premium page
  };

  return (
    <div className="personal-wrapper">
      <h2>Personal Information</h2>
      {user ? (
        <div className="card personal-info-card text-center">
          <div className="profile-icon-container">
            {user.profileIcon === "user" && (
              <i className="fa-solid fa-user profile-icon"></i>
            )}
            {user.profileIcon === "smile" && (
              <i className="fa-regular fa-smile profile-icon"></i>
            )}
            {user.profileIcon === "robot" && (
              <i className="fa-solid fa-robot profile-icon"></i>
            )}
            {user.profileIcon === "alien" && (
              <i className="fa-solid fa-alien profile-icon"></i>
            )}
            {user.profileIcon === "cat" && (
              <i className="fa-solid fa-cat profile-icon"></i>
            )}
          </div>
          <div className="card-body">
            <div className="personal-info-row">
              <strong>First Name:</strong> {user.firstName}
            </div>
            <div className="personal-info-row">
              <strong>Last Name:</strong> {user.lastName}
            </div>
            <div className="personal-info-row">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="personal-info-row">
              <strong>Date of Birth:</strong>{" "}
              {user.dateOfBirth
                ? new Date(user.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </div>
            <div className="personal-info-row">
              <strong>Your Name For Us:</strong> {user.yourNameForUs || "N/A"}
            </div>
            <div className="personal-info-row">
              <strong>Profession:</strong> {user.profession || "N/A"}
            </div>
            <div className="personal-info-row">
              <strong>Interests:</strong> {user.interests?.join(", ") || "N/A"}
            </div>
            <div className="personal-info-row">
              <strong>Experience Level:</strong> {user.experienceLevel || "N/A"}
            </div>
            <div className="personal-info-row">
              <strong>Preferred Contact Time:</strong>{" "}
              {user.preferredContactTime || "N/A"}
            </div>
          </div>
          <div className="premium-alert">
            <FontAwesomeIcon icon={faCrown} className="premium-icon" />
            <h4>Note:</h4>
            <p>
              Unlock the <strong>Edit Option</strong> by upgrading to our
              Premium Version.
            </p>
            <button className="go-premium-btn" onClick={handleGoPremium}>
              Go to Premium Page
            </button>
          </div>
        </div>
      ) : (
        <p>No personal information available.</p>
      )}
    </div>
  );
};

export default Personal;`,
  },
  {
    name: "SendMails",
    appDescription:
      "Hey there! Ready to send some emails? Let’s walk through how you can do that.",
    points: [
      "Start Here: Use this area to add your CSV or JSON files. These files should contain the email addresses of the recipients you want to reach.",
      "Customize Your Message: Fill in the purpose of your email, add a catchy title for your project, and craft your email body. Don’t forget to make it engaging!",
      "Attachments?: Want to share some files? You can easily add attachments right here to provide more information or documents to your recipients.",
      "Check Your Recipients: As you upload your file, you’ll see the number of recipients displayed. This way, you know exactly who will receive your message.",
      'Click Send: Once everything looks good, just hit that "Send" button! Your emails will be on their way in no time!',
    ],
    codeDescription:
      "The SendMails component integrates with email services. It uses the `sendBulkEmails` function to send multiple emails via Mailgun.",
    code: `
// controllers/sendMailController.js
const { sendBulkEmails } = require("../controllers/emailControllers");
const { savePayload } = require("../controllers/TrackingControllers");

const handleSendBulkEmails = async (req, res) => {
  const { recipients, subject, body, title } = req.body;

  if (!recipients || !subject || !body || !title) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let recipientsArray;
  try {
    recipientsArray = JSON.parse(recipients);
  } catch (error) {
    return res.status(400).json({ message: "Invalid recipients format" });
  }

  const attachment = req.file;

  try {
    await sendBulkEmails(recipientsArray.join(", "), subject, body, attachment);
    
    const payload = {
      event: "sent",
      recipient: recipientsArray.join(", "),
      timestamp: Date.now(),
      "message-id": "unique-message-id",
      signature: {
        timestamp: Date.now().toString(),
        token: "your-token",
        signature: "your-signature",
      },
      "delivery-status": {
        message: "Emails sent successfully",
        code: 200,
        description: "OK",
      },
      title: title,
    };

    await savePayload(payload);
    res.status(200).json({ message: "Bulk emails sent successfully" });
  } catch (error) {
    console.error("Error sending bulk emails:", error);
    res.status(500).json({ message: "Error sending bulk emails" });
  }
};

module.exports = { handleSendBulkEmails };
`,
  },
  ,
  {
    name: "SettingsPage",
    appDescription:
      "Welcome to your settings! Here’s what you can do:\n\n" +
      "Change Password: Want to update your password? Click the 'Change Password' button! Just a heads up, for your security, we recommend using the 'Forgot Password' option instead. You'll see a friendly reminder pop up when you do this!\n\n" +
      "Personalize Your Experience: Looking to change your username? Delete your account? Edit your profile? Or maybe adjust your privacy settings? You can easily navigate to all these options right here!\n\n" +
      "Notifications & Language: Stay updated and choose your preferred language in the settings. We’ve got you covered!\n\n" +
      "Need More Info?: Scroll down for a brief overview of settings. Remember, making these changes will enhance your experience!",
    codeDescription:
      "The SettingsPage component allows users to manage their account settings and provides helpful reminders for secure actions.\n\n" +
      "User Feedback:\n" +
      "When the 'Change Password' button is clicked, a warning message appears, encouraging users to consider the 'Forgot Password' option for enhanced security. This message is displayed for 5 seconds and also appears if the component receives a message via the location state.\n\n" +
      "Navigation:\n" +
      "The component includes links to various settings options, allowing users to easily navigate to features like changing the username, deleting their account, editing their profile, and adjusting privacy settings. These links enhance user experience and accessibility.",
    points: [
      "User Feedback: When the 'Change Password' button is clicked, a warning message appears, encouraging users to consider the 'Forgot Password' option for enhanced security. This message is displayed for 5 seconds and also appears if the component receives a message via the location state.",
      "Navigation: The component includes links to various settings options, allowing users to easily navigate to features like changing the username, deleting their account, editing their profile, and adjusting privacy settings. These links enhance user experience and accessibility.",
    ],
    code: `
// SettingsPage.jsx
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
          <Link to="/delete-account">Delete Account</Link>
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
`,
  },
  ,
  {
    name: "PremiumPage",
    appDescription:
      "Welcome to the Premium Page! Here’s how you can choose your perfect subscription plan:\n\n" +
      "Explore Your Options: We’ve got several premium plans for you to consider. Each card shows you the plan details, including features and pricing.\n\n" +
      "Select Your Plan: Click on a plan that catches your eye to select it. Once selected, you’ll see a confirmation message!\n\n" +
      "Proceed to Payment: After selecting a plan, just hit the 'Proceed to Pay' button. This will take you to the payment page to finalize your subscription.\n\n" +
      "Special Note: If you have any questions about the plans, feel free to reach out for assistance.\n\n" +
      "The PremiumPage component displays various subscription plans using PriceCard components. It allows users to select a plan and navigate to the PaymentPage with their chosen price.",
    codeDescription:
      "The PremiumPage component details premium offerings. It utilizes the useState hook to manage the selected plan and conditionally renders the proceed button based on user interaction.\n\n" +
      "Navigation:\n" +
      "When a user selects a price, a confirmation message is displayed, and they can proceed to the payment page by clicking the button. The selected price is passed via the React Router's state to the next page.",
    points: [
      "Explore Your Options: Multiple premium plans are available, each displaying features and pricing.",
      "Select Your Plan: Users can select a plan and receive a confirmation message.",
      "Proceed to Payment: After selection, users can click 'Proceed to Pay' to navigate to the payment page.",
    ],
    code: `// PremiumPage.jsx
import React, { useState } from "react";
import PriceCard from "../pages/PriceCard";
import PriceData from "../priceData"; // Assuming you have a PriceData.js file
import { useNavigate } from "react-router-dom"; // Import useNavigate

function PremiumPage() {
  const navigate = useNavigate(); // useNavigate for redirection
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
    setShowMessage(true);
  };

  const handleProceedToPay = () => {
    if (selectedPrice) {
      navigate("/payment", { state: { selectedPrice } }); // Pass the selectedPrice via state
    }
  };

  return (
    <div>
      <h2>Select a Premium Plan</h2>
      <div className="price-cards-container">
        {PriceData.map((card, index) => (
          <PriceCard
            key={index}
            plan={card.plan}
            price={card.price}
            features={card.features}
            onSelect={handlePriceSelect}
          />
        ))}
      </div>

      {showMessage && (
        <div
          className="swipe-message"
          style={{
            color: "Red", // White font color
          }}
        >
          <p>Click Proceed to start the payment process</p>
        </div>
      )}

      {selectedPrice && (
        <button
          onClick={handleProceedToPay}
          className="btn"
          style={{
            backgroundColor: "#007bff",
            color: "white", // White font color
            border: "1px solid #007bff", // Border color matching the background
            borderRadius: "0.375rem", // Bootstrap's border radius for rounded corners
            boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)", // Shadow effect
            padding: "10px 20px", // Padding for better appearance
          }}
        >
          Proceed to Pay $$selectedPrice
        </button>
      )}
    </div>
  );
}

export default PremiumPage;

// PriceCard.jsx
import React from "react";
import "../styles/PriceCard.css";

function PriceCard({ plan, price, features, onSelect }) {
  return (
    <div className="price-card">
      <div className="card-header">
        <span className="plan">{plan}</span>
        <span className="price">$price/month</span>
      </div>
      <ul className="card-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button className="button" onClick={() => onSelect(price)}>
        Go Premium
      </button>
    </div>
  );
}

export default PriceCard;`,
  },
];

export default ExploreData;
