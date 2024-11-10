import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BooksDataGrid from './BooksTable';
import { Button } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT from localStorage
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Book Exchange App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/books-list">Books List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/requests">Requests</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">Pricing</Link>
            </li>
          </ul>
          {/* Right-aligned links for Logout and Manage Profile */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Manage Profile</Link>
            </li>
            <li className="nav-item">
              <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
      <div className="container mt-4">
        <h1>Welcome to Book Exchange App!</h1>
        <p>Start by donating or requesting for books.</p>
        <BooksDataGrid />
      </div>
    </div>
  );
};

export default Home;
