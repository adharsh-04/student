import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const buttonStyle = {
    fontSize: '1.2rem',
    padding: '0.5rem 1rem',
  };

  return (
    <header className="bg-warning shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light py-3">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo that redirects to Dashboard */}
          <Link className="navbar-brand text-dark font-weight-bold" to="/dashboard">
            <img
              src="https://us.123rf.com/450wm/ansorizakaria/ansorizakaria2206/ansorizakaria220600106/187806504-education-school-pen-book-symbol-logo-design-template-inspiration.jpg?ver=6"  // Replace with your logo's URL
              alt="Logo"
              className="img-fluid"
              style={{ width: '50px', marginRight: '10px' }}
            />
          </Link>
          
          {/* Title in the middle */}
          <div className="">
            <span className="navbar-brand font-weight-bold" style={{ fontSize: '2.5rem', color: '#000',fontFamily:'italic' }}>
              StudentApp
            </span>
          </div>

          {/* Login and Register buttons on the right */}
          <div className="d-flex">
            <Link className="btn btn-outline-primary mx-2" to="/signin" style={buttonStyle}>
              Login
            </Link>
            <Link className="btn btn-outline-primary mx-2" to="/signup" style={buttonStyle}>
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
