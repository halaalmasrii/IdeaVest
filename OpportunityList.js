import React, { useState } from "react";
import Opportunity from "./Opportunity"; // المسار حسب مجلداتك
import apiClient from "../apiClient"; // استيراد apiClient للتعامل مع axios

const OpportunityList = ({ opportunities, setOpportunities }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [currentOpportunity, setCurrentOpportunity] = useState(null);

  const handleAddClick = () => {
    setIsAdding(true);
    setCurrentOpportunity(null);
  };

  const handleEditClick = (opportunity) => {
    setIsAdding(true);
    setCurrentOpportunity(opportunity);
  };

  const handleDeleteClick = (id) => {
    apiClient
      .delete(`/opportunity/${id}`) // تعديل المسار حسب الـ API
      .then(() => {
        setOpportunities(
          opportunities.filter((opportunity) => opportunity.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting opportunity:", error);
      });
  };

  const handleSave = (opportunity) => {
    if (currentOpportunity) {
      // تحديث الفرصة الموجودة
      apiClient
        .put(`/opportunity/${opportunity.id}`, opportunity)
        .then((response) => {
          setOpportunities(
            opportunities.map((opp) =>
              opp.id === opportunity.id ? response.data : opp
            )
          );
          setIsAdding(false);
        })
        .catch((error) => {
          console.error("Error updating opportunity:", error);
        });
    } else {
      // إضافة فرصة جديدة
      apiClient
        .post("/opportunity", opportunity)
        .then((response) => {
          setOpportunities([...opportunities, response.data]);
          setIsAdding(false);
        })
        .catch((error) => {
          console.error("Error adding opportunity:", error);
        });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setCurrentOpportunity(null);
  };

  return (
    <div className="opportunity-list">
      <h2>Opportunities</h2>
      <button onClick={handleAddClick}>Add Opportunity</button>
      {opportunities.length === 0 ? (
        <p>No opportunities available</p>
      ) : (
        <ul>
          {opportunities.map((opportunity) => (
            <li key={opportunity.id}>
              <h4>{opportunity.opportunityName}</h4>
              <p>{opportunity.description}</p>
              <button onClick={() => handleEditClick(opportunity)}>Edit</button>
              <button onClick={() => handleDeleteClick(opportunity.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {isAdding && (
        <Opportunity
          opportunity={currentOpportunity}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default OpportunityList;
