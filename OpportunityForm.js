import React, { useState } from 'react';
import './opp.css';

const OpportunityForm = ({ addOpportunity, setFormVisible }) => {
  const [image, setImage] = useState('');
  const [opportunityName, setOpportunityName] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(''); // إضافة حقل السعر

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
    addOpportunity({ opportunityName, industry, description, image, price });
    setOpportunityName('');
    setIndustry('');
    setDescription('');
    setImage('');
    setPrice(''); // إعادة تعيين حقل السعر
  };

  return (
    <div className="product-form-overlay">
      <div className="product-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Opportunity Name"
            value={opportunityName}
            onChange={(e) => setOpportunityName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
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
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
