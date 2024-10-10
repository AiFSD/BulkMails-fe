import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/TrackLogs.css";

const TrackLogs = () => {
  const [trackLogs, setTrackLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrackLogs = async () => {
      try {
        const response = await axios.get(
          "https://bulkmails-be-1.onrender.com/api/track-logs"
        );
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
    navigate("/full-data", { state: { log } });
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
              <h4>Title : {log.title}</h4>
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
