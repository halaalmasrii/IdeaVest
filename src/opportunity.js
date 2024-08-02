import React from 'react';
import './App.css';

const Opportunity = ({ opportunity, setSelectedOpportunity }) => {
  return (
    <div className="opportunity">
      <img src={opportunity.image} alt={opportunity.opportunityname} />
      <h2>{opportunity.opportunityname}</h2>
      <h4>{opportunity.description}</h4>
      <h4>{opportunity.industry}</h4>
      <button onClick={() => setSelectedOpportunity(opportunity)}>Details</button>
    </div>
  );
};

export default Opportunity;