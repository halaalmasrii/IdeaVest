
import React, { useState } from 'react';
import './App.css';

function App() {
  const [profileImage, setProfileImage] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    username:'',
    email: '',
    phone: '',
    pdfFile: '',
  
  });
  const [isEditing, setIsEditing] = useState(true);
  const [opportunities, setOpportunities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newOpportunity, setNewOpportunity] = useState({
    name: '',
    description: '',
    industry: '',
    fundingAmount: '',
    reqFunding: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleOpportunityChange = (e) => {
    const { name, value } = e.target;
    setNewOpportunity({ ...newOpportunity, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePDFChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, pdfFile: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleAddOpportunity = () => {
    setOpportunities([...opportunities, newOpportunity]);
    setNewOpportunity({
      name: '',
      description: '',
      industry: '',
      fundingAmount: '',
      reqFunding: ''
    });
    setShowForm(false);
  };

  const handleDeleteOpportunity = (index) => {
    const updatedOpportunities = opportunities.filter((_, i) => i !== index);
    setOpportunities(updatedOpportunities);
  };

  const handleEditOpportunity = (index) => {
    setNewOpportunity(opportunities[index]);
    handleDeleteOpportunity(index);
    setShowForm(true);
  };


return (
    <div className="App">
      <div className="container">
        <div className="sidebar">
          <div className="profile-img-container">
            <img src={profileImage || 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg'} alt="Profile" className="profile-img"/>
            {isEditing && <input type="file" accept="image/*" onChange={handleImageChange} className="image-upload"/>}
          </div>
          <input 
            type="text" 
            name="name" 
            value={profileData.name} 
            onChange={handleInputChange} 
            placeholder="Name" 
            className="input-field"
            disabled={!isEditing}
          />
              <input 
            type="text" 
            name="username" 
            value={profileData.username} 
            onChange={handleInputChange} 
            placeholder="userName" 
            className="input-field"
            disabled={!isEditing}
          />
         <input 
            type="email" 
            name="email" 
            value={profileData.email} 
            onChange={handleInputChange} 
            placeholder="E-mail" 
            className="input-field"
            disabled={!isEditing}
          />
            <input 
            type= "number"
            name="phone" 
            value={profileData.phone} 
            onChange={handleInputChange} 
            placeholder="Phone" 
            className="input-field"
            disabled={!isEditing}
          />
         <input 
            type="file" 
            accept="application/pdf" 
            onChange={handlePDFChange} 
            className="input-field"
            disabled={!isEditing}
          />
           <div className="actions">
            <button className="btn" onClick={toggleEdit}>
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
          </div>
        </div>
     <  div className='main-content'>
     <h1>Opportunity</h1>
          <div className="add-opportunity" onClick={() => setShowForm(true)}>
            +
          </div>
          {showForm && (
            <div className="opportunity-form-overlay">
              <div className="opportunity-form">
                <form>
                  <input 
                    type="text" 
                    name="name" 
                    value={newOpportunity.name} 
                    onChange={handleOpportunityChange} 
                    placeholder="Name" 
                  />
                  <input 
                    type="text" 
                    name="description" 
                    value={newOpportunity.description} 
                    onChange={handleOpportunityChange} 
                    placeholder="Description" 
                  />
                  <input 
                    type="text" 
                    name="industry"
                    value={newOpportunity.industry} 
                    onChange={handleOpportunityChange} 
                    placeholder="Industry" 
                  />
                  <input 
                    type="text" 
                    name="fundingAmount" 
                    value={newOpportunity.fundingAmount} 
                    onChange={handleOpportunityChange} 
                    placeholder="Funding Amount" 
                  />
                  <input 
                    type="text" 
                    name="reqFunding" 
                    value={newOpportunity.reqFunding} 
                    onChange={handleOpportunityChange} 
                    placeholder="Required Funding" 
                  />
                  
                  <button type="button" onClick={handleAddOpportunity}>Add Opportunity</button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </form>
              </div>
            </div>
          )}
          <h3> Last Opportunities</h3>
          {opportunities.map((opp, index) => (
            <div key={index} className="opportunity-card">
              <h4>{opp.name}</h4>
              <p>{opp.description}</p>
              <p>{opp.industry}</p>
              <p>{opp.fundingAmount}</p>
              <p>{opp.reqFunding}</p>
              <button onClick={() => handleEditOpportunity(index)}>Edit</button>
              <button onClick={() => handleDeleteOpportunity(index)}>Delete</button>
            </div>
          ))}
      </div>
     
      </div>
 </div>
  
  );
}

export default App;
