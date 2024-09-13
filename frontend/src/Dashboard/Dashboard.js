import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file

function Dashboard() {
  // Retrieve the username from local storage
  const username = localStorage.getItem('username') || 'User';

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            {/* Welcome Message */}
            <h1 className="welcome-message">Welcome, {username}!</h1>
            <p className="dashboard-subtitle">Your personal dashboard for managing events, scholarships, and more.</p>

            {/* Navigation Buttons */}
            <nav className="dashboard-nav mt-4">
              <Link className="btn dashboard-btn m-3" to="/events">
                Events
              </Link>
              <Link className="btn dashboard-btn m-3" to="/scholarship">
                Scholarship
              </Link>
              <Link className="btn dashboard-btn m-3" to="/fileuploadform">
                Print
              </Link>
              <Link className="btn dashboard-btn m-3" to="/fileupload">
                Exam Essentials
              </Link>
            </nav>

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
