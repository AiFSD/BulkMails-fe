import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/History.css";

const History = () => {
  const [emailEvents, setEmailEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmailEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://bulkmails-be-1.onrender.com/api/email-events"
        );
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
                Recipients Count:{" "}
                {emailEvent.recipient
                  ? emailEvent.recipient.split(",").length
                  : 0}
              </p>
              <button
                className="view-mail-button"
                onClick={() => navigate(`/mail-details/${emailEvent._id}`)}
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
