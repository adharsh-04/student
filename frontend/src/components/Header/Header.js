import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Custom CSS for additional styling

function Header() {
  const buttonStyle = {
    fontSize: '1.2rem', // Increase font size
    padding: '0.5rem 1rem' // Adjust padding if needed to maintain header height
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center', // Align items vertically centered
    justifyContent: 'flex-end' // Align items to the right
  };

  return (
    <header className="bg-warning shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light py-3">
        <div className="container">
          <Link className="navbar-brand text-dark font-weight-bold" to="/">
            StudentApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" style={navStyle}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-dark btn btn-outline-primary mx-2" to="signin" style={buttonStyle}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark btn btn-primary mx-2" to="signup" style={buttonStyle}>
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
