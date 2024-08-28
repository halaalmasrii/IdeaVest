import React, { useState, useEffect } from "react";
import OpportunityCard from "./Opportunity";
import OpportunityForm from "./OpportunityForm";
import apiClient from "../apiClient"; // استخدام axios عبر apiClient
import "./opp.css";

const Opp = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [wallet, setWallet] = useState(1000000); // المحفظة الوهمية

  useEffect(() => {
    apiClient
      .get("/opportunity")
      .then((response) => setOpportunities(response.data))
      .catch((error) => console.error("Error fetching opportunities:", error));
  }, []);

  const addOpportunity = (newOpportunity) => {
    setOpportunities([
      ...opportunities,
      { ...newOpportunity, id: opportunities.length + 1 },
    ]);
    setFormVisible(false);
  };

  const handlePurchase = () => {
    const price = parseFloat(selectedOpportunity.price);
    if (wallet >= price) {
      setWallet(wallet - price);
      alert("Purchase successful!");
      setSelectedOpportunity(null);
    } else {
      alert("Insufficient funds");
    }
  };

  return (
    <div className="App">
      <h1>Opportunity List</h1>
      <div className="product-container">
        {opportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            setSelectedOpportunity={setSelectedOpportunity}
          />
        ))}
        <div className="add-product" onClick={() => setFormVisible(true)}>
          <span>+</span>
        </div>
      </div>
      {formVisible && (
        <OpportunityForm
          addOpportunity={addOpportunity}
          setFormVisible={setFormVisible}
        />
      )}
      {selectedOpportunity && (
        <div className="product-detail-overlay">
          <div className="product-detail-modal">
            <div className="product-detail-content">
              <h2>Opportunity: {selectedOpportunity.opportunityName}</h2>
              <p>Industry: {selectedOpportunity.industry}</p>
              <p>Description: {selectedOpportunity.description}</p>
              <h3>Price: {selectedOpportunity.price} USD</h3>
              <button onClick={handlePurchase}>Confirm Purchase</button>
              <button onClick={() => setSelectedOpportunity(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="wallet-info">
        <p>Wallet Balance: {wallet} USD</p>
      </div>
    </div>
  );
};

export default Opp;
