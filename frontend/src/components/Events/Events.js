import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Events() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          <h1>Events</h1>
          <p>Welcome to the Events page.</p>
          <nav className='d-flex justify-content-evenly'>
            <Link className="btn btn-secondary text-dark nav-link-info" to="addevents">
              Add Events
            </Link>
            <Link className="btn btn-secondary text-dark nav-link-info" to="viewevents">
              View Events
            </Link>
          </nav>
          {/* Outlet renders the nested routes under Events */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Events;
