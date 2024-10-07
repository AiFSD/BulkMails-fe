// NewsTicker.jsx
import React from "react";
import "../styles/NewsTicker.css";

const NewsTicker = ({ messages }) => {
  return (
    <div className="news-ticker">
      <p>{messages.join(" | ")}</p>
    </div>
  );
};

export default NewsTicker;
