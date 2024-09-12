import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          <h1>Dashboard</h1>
          <p>Welcome to your Student App.</p>
          <nav>
            <Link className="btn btn-secondary text-dark nav-link-info d-block m-auto w-25 mt-4" to="/events">
              Events
            </Link>
            <Link className="btn btn-secondary text-dark nav-link-info d-block m-auto w-25 mt-4" to="/scholarship">
              Scholarship
            </Link>
            <Link className="btn btn-secondary text-dark nav-link-info d-block m-auto w-25 mt-4" to="/fileuploadform">
              print
            </Link>
            <Link className="btn btn-secondary text-dark nav-link-info d-block m-auto w-25 mt-4" to="/fileupload">
              Exam Essentials
            </Link>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
