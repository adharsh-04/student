import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Events() {
  return (
    <div className="container mt-2 mb-2">
      <div className="row">
        <div className="col-lg-12">
          {/* Navigation Buttons */}
          <nav className="d-flex justify-content-evenly mb-4">
            <Link className="btn btn-secondary text-dark" to="/events/addevents">
              Add Events
            </Link>
            <Link className="btn btn-secondary text-dark" to="/events/viewevents">
              View Events
            </Link>
          </nav>

          {/* Render nested components */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Events;
