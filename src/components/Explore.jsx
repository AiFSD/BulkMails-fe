import React, { useState } from "react";
import ExploreData from "../datas/ExploreData";
import "../styles/sidebar.css";
import { Card } from "react-bootstrap";

const Explore = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (item) => {
    setSelectedComponent(item);
  };

  return (
    <div className="d-flex">
      <nav className="sidebar-container">
        <h4>Explore Components</h4>
        <ul className="nav-links">
          {ExploreData.map((item, index) => (
            <li key={index}>
              <a
                className="nav-link"
                onClick={() => handleComponentClick(item)}
                style={{ cursor: "pointer" }}
              >
                🢂 {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="content-container">
        <h1>Explore Documentation</h1>
        {selectedComponent ? (
          <Card
            className="mb-4"
            style={{
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Card.Header
              className="bg-primary text-white"
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            >
              <h3>{selectedComponent.name}</h3>
            </Card.Header>
            <Card.Body>
              <p>{selectedComponent.appDescription}</p>
             
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {selectedComponent.points?.map((point, index) => (
                  <li
                    key={index}
                    style={{
                      padding: "10px",
                      border: "1px solid #e0e0e0",
                      borderRadius: "5px",
                      marginBottom: "10px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
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

export default Explore;
