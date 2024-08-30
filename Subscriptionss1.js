// src/pages/Subscriptionss1.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Subscriptionss1 = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/subscriptionss1').then(response => {
      setSubscriptions(response.data);
    });
  }, []);

  return (
    <>
    <>
    <div>
      <h1>Subscriptions</h1>
      <ul>
        {subscriptions.map(subscription => (
          <li key={subscription.id}>{subscription.name}</li>
        ))}
      </ul>
    </div>
    </>
    </>
  );
};

export default Subscriptionss1;
