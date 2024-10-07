import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import "../styles/MailDetails.css"; 
const MailDetails = () => {
  const { id } = useParams(); 
  const [emailEvent, setEmailEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmailEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/email-events/${id}`
        );
        setEmailEvent(response.data);
      } catch (error) {
        console.error("Error fetching email event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailEvent();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!emailEvent) return <p>Email event not found.</p>;

  return (
    <div className="mail-details">
      <h2>Email Details</h2>
      <table className="details-table">
        <tbody>
          <tr>
            <td>
              <strong>Subject:</strong>
            </td>
            <td>{emailEvent.subject}</td>
          </tr>
          <tr>
            <td>
              <strong>Body:</strong>
            </td>
            <td>{emailEvent.body}</td>
          </tr>
          <tr>
            <td>
              <strong>Timestamp:</strong>
            </td>
            <td>{new Date(emailEvent.timestamp).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MailDetails;
