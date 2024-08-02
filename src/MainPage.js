import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Testimonials from './Testimonials';
import Counter from './Counter';

function MainPage() {
  const navigate = useNavigate();

  const handleJoinUsClick = () => {
    navigate('/login');
  };

  return (
    <div className="main-page">
      <header className="header">
        <button className="join-us-btn" onClick={handleJoinUsClick}>Join Us</button>
      </header>
      <Testimonials />
      <Counter />
    </div>
  );
}

export default MainPage;