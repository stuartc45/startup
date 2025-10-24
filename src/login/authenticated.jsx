import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
// import './authenticated.css';

export function Authenticated({ userName, onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    // Clear saved user data
    localStorage.removeItem('userName');

    // Notify parent (App) to update state
    onLogout();

    // Redirect to home page
    navigate('/');
  }

  return (
    <div className="text-center mt-4">
      <h2>Welcome back, {userName}!</h2>
      <p>You’re signed in to JournalEasy.</p>
      <div className="d-flex justify-content-center gap-2 mt-3">
        <Button variant="primary" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}