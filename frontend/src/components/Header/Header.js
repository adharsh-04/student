import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Custom CSS for additional styling

// Manual JWT parsing function
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error('Invalid token:', e);
    return null;
  }
}

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        setUsername(decodedToken.username);
        setIsLoggedIn(true);  // User is logged in
      } else {
        setIsLoggedIn(false); // No valid token found
      }
    } else {
      setIsLoggedIn(false);   // No token, user is not logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/signin');
  };

  const buttonStyle = {
    fontSize: '1.2rem',
    padding: '0.5rem 1rem',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
              {!isLoggedIn ? (  // Show Login and Register links if not logged in
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark btn btn-outline-primary mx-2" to="/signin" style={buttonStyle}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark btn btn-primary mx-2" to="/signup" style={buttonStyle}>
                      Register
                    </Link>
                  </li>
                </>
              ) : (  // Show username and Logout button if logged in
                <>
                  <li className="nav-item">
                    <span className="nav-link text-dark">Hello, {username}</span>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-outline-danger mx-2" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
