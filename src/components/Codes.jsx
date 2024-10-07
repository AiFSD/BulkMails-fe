import React, { useState } from "react";
import ExploreData from "../datas/ExploreData";
import "../styles/sidebar.css"; 
import { Card } from "react-bootstrap"; 

const Codes = () => {
  const [selectedCode, setSelectedCode] = useState(null);

  const handleCodeClick = (item) => {
    setSelectedCode(item);
  };

  return (
    <div className="d-flex">
      <nav className="sidebar-container">
        <h4>Code Components</h4>
        <ul className="nav-links">
          {ExploreData.map((item, index) => (
            <li key={index}>
              <a
                className="nav-link"
                onClick={() => handleCodeClick(item)}
                style={{ cursor: "pointer" }}
              >
                🢂 {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="content-container">
        <h1>Code Documentation</h1>
        {selectedCode ? (
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              <h3>{selectedCode.name}</h3>
            </Card.Header>
            <Card.Body>
              <p>{selectedCode.codeDescription}</p>
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                <code>{selectedCode.code}</code>
              </pre>
            </Card.Body>
          </Card>
        ) : (
          <Card className="mb-4">
            <Card.Body>
              <p>
                Select a component from the sidebar to see its documentation.
              </p>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Codes;
