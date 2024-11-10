// src/components/Logout.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT from localStorage
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
