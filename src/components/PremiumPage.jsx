import React, { useState } from "react";
import PriceCard from "../pages/PriceCard";
import PriceData from "../priceData"; 
import { useNavigate } from "react-router-dom"; 

function PremiumPage() {
  const navigate = useNavigate(); 
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
    setShowMessage(true);
  };

  const handleProceedToPay = () => {
    if (selectedPrice) {
      navigate("/payment", { state: { selectedPrice } }); 
    }
  };

  return (
    <div>
      <h2>Select a Premium Plan</h2>
      <div className="price-cards-container">
        {PriceData.map((card, index) => (
          <PriceCard
            key={index}
            plan={card.plan}
            price={card.price}
            features={card.features}
            onSelect={handlePriceSelect}
          />
        ))}
      </div>

      {showMessage && (
        <div
          className="swipe-message"
          style={{
            color: "Red", 
          }}
        >
          <p>Click Proceed to start the payment process</p>
        </div>
      )}

      {selectedPrice && (
        <button
          onClick={handleProceedToPay}
          className="btn"
          style={{
            backgroundColor: "#007bff", 
            color: "white",
            border: "1px solid #007bff",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)",
            padding: "10px 20px", 
          }}
        >
          Proceed to Pay ${selectedPrice}
        </button>
      )}
    </div>
  );
}

export default PremiumPage;
