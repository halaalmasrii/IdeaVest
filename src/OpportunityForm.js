import React, { useState } from 'react';
import './App.css';

const OpportunityForm = ({ addOpportunity, setFormVisible }) => {
  const [opportunityname, setopportunityname] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [fundingamount, setFundingamount] = useState('');
  const [reqfunding, setReqfunding] = useState('');
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOpportunity({ opportunityname, description, industry,reqfunding,fundingamount , image });
    setopportunityname('');
    setIndustry('');
    setDescription('');
    setFundingamount('');
    setReqfunding('');
    setImage('');
  };

  return (
    <div className="opportunity-form-overlay">
      <div className="opportunity-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Opportunity Name"
            value={opportunityname}
            onChange={(e) => setopportunityname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="indusrty"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="fundingamount"
            value={fundingamount}
            onChange={(e) => setFundingamount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="reqfunding"
            value={reqfunding}
            onChange={(e) => setReqfunding(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <button type="submit">Add Opportunity</button>
          <button type="button" onClick={() => setFormVisible(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default OpportunityForm;