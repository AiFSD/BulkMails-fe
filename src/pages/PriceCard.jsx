import React from "react";
import "../styles/PriceCard.css";

function PriceCard({ plan, price, features, onSelect }) {
  return (
    <div className="price-card">
      <div className="card-header">
        <span className="plan">{plan}</span>
        <span className="price">${price}/month</span>
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

export default PriceCard;
