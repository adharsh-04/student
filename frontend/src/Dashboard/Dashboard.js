import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file

function Dashboard() {
  // Retrieve the username from local storage
  const username = localStorage.getItem('username') || 'User';

  return (
    <div className="dashboard-container mt-2 mb-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h1>Dashboard</h1>
            <p>Welcome, {username}!</p> {/* Display the username here */}
            <nav>
              <Link className="btn btn-secondary text-dark nav-link-info d-block m-auto w-25 mt-4" to="/events">
                Events
              </Link>
              <Link className="btn btn-secondary text-dark nav-link-info d-block m-auto w-25 mt-4" to="/scholarship">
                Scholarship
              </Link>
              <Link className="btn btn-secondary text-dark nav-link-info d-block m-auto w-25 mt-4" to="/fileuploadform">
                Print
              </Link>
              <Link className="btn btn-secondary text-dark nav-link-info d-block m-auto w-25 mt-4" to="/fileupload">
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
