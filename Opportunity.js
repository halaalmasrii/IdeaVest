import React from "react";
import "./opp.css";

const OpportunityCard = ({ opportunity, setSelectedOpportunity }) => {
  return (
    <div className="opportunity-card" onClick={() => setSelectedOpportunity(opportunity)}>
      <img 
        src={opportunity.image || "https://via.placeholder.com/150"} 
        alt={opportunity.opportunityName || "Opportunity Image"} 
        className="opportunity-image"
      />
      <h3>{opportunity.opportunityName}</h3>
      <p>{opportunity.industry}</p>
      <p>{opportunity.description.slice(0, 50)}...</p>
      <button onClick={() => setSelectedOpportunity(opportunity)}>
        Read more
      </button>
    </div>
  );
};

export default OpportunityCard;
