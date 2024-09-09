import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Dashboard() {
  return (
    <div className="container mt-5">
    <div className="row">
      <div className="col-lg-12">
        <h1>Dashboard</h1>
        <p>Welcome to your Student App.</p>
        <nav className=''>
          <Link className="btn btn-secondary text-dark nav-link-info d-block m-auto w-25 mt-4 " to='events'>
            Events
          </Link>
          <Link className="btn btn-secondary text-dark nav-link-info d-block m-auto w-25 mt-4" to="file">
          File
          </Link>
          <Link className="btn btn-secondary text-dark nav-link-info d-block m-auto w-25 mt-4" to="scholorship">
          Scholorship
          </Link>
        </nav>
        <Outlet/>{/* This will render the nested routes most importantone to be mentioned */}
      </div>
    </div>
  </div>
  );
}

export default Dashboard;
