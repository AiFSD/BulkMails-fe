import React, { useState } from "react";
import axios from "axios";
import "../styles/SendMails.css";

const SendMails = () => {
  const [recipientCount, setRecipientCount] = useState(0);
  const [file, setFile] = useState(null);
  const [purpose, setPurpose] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attachment, setAttachment] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const fileType = file.type;
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;

        if (fileType === "application/json") {
          const jsonData = JSON.parse(content);
          setRecipientCount(jsonData.length);
        } else if (fileType === "text/csv") {
          const csvData = content.split("\n");
          setRecipientCount(csvData.length - 1);
        }
      };

      reader.readAsText(file);
    }
  };

  const handleAttachmentUpload = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("file");
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const data = event.target.result;
        const parsedData = JSON.parse(data);

        const recipients = JSON.stringify(parsedData.map((item) => item.email));

        const formData = new FormData();
        formData.append("recipients", recipients);
        formData.append("subject", subject);
        formData.append("body", body);
        formData.append("title", title);
        if (attachment) formData.append("attachment", attachment);

        console.log("Form Data:", {
          recipients,
          subject,
          body,
          title,
          attachment,
        });

        const response = await axios.post(
          "https://bulkmails-be-1.onrender.com/api/send-bulk-emails",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Emails sent successfully");
      } catch (error) {
        console.error(
          "Error sending emails:",
          error.response ? error.response.data : error
        );
        alert("Failed to send emails");
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <h1>Start sending today! Experience the difference.</h1>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <label className="label" htmlFor="purpose">
            Purpose of mail:
          </label>
          <input
            className="input"
            type="text"
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
          <br />
          <label className="label" htmlFor="title">
            Title for the project:
          </label>
          <input
            className="input"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label className="label" htmlFor="file">
            Add CSV or JSON file:
          </label>
          <input
            className="input"
            type="file"
            id="file"
            onChange={handleFileUpload}
            accept=".csv, .json"
          />
          <br />
          <label className="label" htmlFor="subject">
            Subject:
          </label>
          <textarea
            className="subjectarea"
            name="subject"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <br />
          <label className="label" htmlFor="body">
            Compose Mail:
          </label>
          <textarea
            className="textarea"
            name="body"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <br />
          <label className="label" htmlFor="attachments">
            Add attachments:
          </label>
          <input
            className="input"
            type="file"
            id="attachments"
            onChange={handleAttachmentUpload}
          />
          <button
            className="button"
            type="submit"
            disabled={!file || !subject || !body}
          >
            Send
          </button>
          <p className="paragraph">Number of recipients: {recipientCount}</p>
        </form>
      </div>
    </>
  );
};

export default SendMails;
