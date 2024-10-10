import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "/src/styles/status.css";

const Status = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://bulkmails-be-1.onrender.com/api/email-events"
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
        setError("Failed to fetch email events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleTrack = () => {
    navigate("/track-logs");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Email Status</h2>
      {events.length === 0 ? (
        <p>No email events to display.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Event Type</th>
              <th>Sender</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{new Date(event.timestamp).toLocaleString()}</td>
                <td>{event.eventType}</td>
                <td>{event.sender}</td>
                <td>{event.deliveryStatus || "N/A"}</td>
                <td>
                  <button onClick={handleTrack}>Track</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Status;
