// src/pages/Userss.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Userss = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/userss').then(response => {
      setUsers(response.data);
    });
  }, []);

  const blockUser = (id) => {
    axios.post(`/api/admin/userss/${id}/block`).then(() => {
      setUsers(users.map(user => user.id === id ? { ...user, blocked: true } : user));
    });
  }; 

  return (
    <>
    <>
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
          <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>
                {!user.blocked && <button onClick={() => blockUser(user.id)}>Block</button>}
                {user.blocked && <span>Blocked</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
    </>
  );
};

export default Userss;
