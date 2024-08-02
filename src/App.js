import React, { useState } from "react";
import Opportunity from "./opportunity";
import OpportunityForm from "./OpportunityForm";
import Navbar from "./Navbar";
import "./App.css";


/* Rest of your existing CSS */
const App = () => {
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      opportunityname: "Pineapple",
      description: "Delicious fruit",
      industry: "Delicious fruit",
      fundingamount: "Delicious",
      reqfunding: "fruit",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      opportunityname: "Pineapple",
      description: "Delicious fruit",
      industry: "Delicious fruit",
      fundingamount: "Delicious",
      reqfunding: "fruit",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      opportunityname: "Pineapple",
      description: "Delicious fruit",
      industry: "Delicious fruit",
      fundingamount: "Delicious",
      reqfunding: "fruit",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      opportunityname: "Pineapple",
      description: "Delicious fruit",
      industry: "Delicious fruit",
      fundingamount: "Delicious",
      reqfunding: "fruit",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      opportunityname: "Pineapple",
      description: "Delicious fruit",
      industry: "Delicious fruit",
      fundingamount: "Delicious",
      reqfunding: "fruit",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      opportunityname: "Pineapple",
      description: "Delicious fruit",
      industry: "Delicious fruit",
      fundingamount: "Delicious",
      reqfunding: "fruit",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const [formVisible, setFormVisible] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const addOpportunity = (opportunity) => {
    setOpportunities([...opportunities, { ...opportunity, id: opportunities.length + 1 }]);
    setFormVisible(false);
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  const handleProfile = () => {
    console.log("Profile clicked");
  };

  return (
    <div className="App">
      <Navbar onLogout={handleLogout} onProfile={handleProfile} />
      <h1>Opportunity List</h1>
      <div className="opportunity-container">
        {opportunities.map((opportunity) => (
          <Opportunity
            key={opportunity.id}
            opportunity={opportunity}
            setSelectedOpportunity={setSelectedOpportunity}
          />
        ))}
        <div className="add-opportunity" onClick={() => setFormVisible(true)}>
          <span>+</span>
        </div>
      </div>
      {formVisible && (
        <OpportunityForm addOpportunity={addOpportunity} setFormVisible={setFormVisible} />
      )}
      {selectedOpportunity && (
        <div className="opportunity-detail-overlay">
          <div className="opportunity-detail-modal">
            <div className="opportunity-detail-left">
              <img src={selectedOpportunity.image} alt={selectedOpportunity.name} />
            </div>
            <div className="opportunity-detail-right">
              <h2>{selectedOpportunity.opportunityname}</h2>
              <h4>{selectedOpportunity.description}</h4>
              <p>{selectedOpportunity.industry}</p>
              <p>{selectedOpportunity.fundingamount}</p>
              <p>{selectedOpportunity.reqfunding}</p>
              <button onClick={() => setSelectedOpportunity(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;