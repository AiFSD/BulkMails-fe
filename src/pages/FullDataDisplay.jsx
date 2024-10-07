import React from "react";
import { useLocation } from "react-router-dom"; 
const FullDataDisplay = () => {
  const location = useLocation();
  const { log } = location.state || {};

  if (!log) {
    return <p>No data available.</p>;
  }

  return (
    <div className="full-data-display">
      <h2>Full Data</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(log).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                {typeof value === "object" ? JSON.stringify(value) : value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FullDataDisplay;
