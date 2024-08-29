// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/Dashboard">Dashboard</NavLink>
      <NavLink to="/Opportunities">Opportunities</NavLink>
      <NavLink to="/Userss">Users</NavLink>
      <NavLink to="/Subscriptionss1">Subscriptions</NavLink>
      <NavLink to="/Complaintts1">Complaints</NavLink>
    </div>
  );
};
export default Sidebar;
