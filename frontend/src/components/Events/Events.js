import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Events() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          <h1>Events</h1>
          <p>Welcome to Events page.</p>
          <nav className='d-flex justify-content-evenly'>
            <Link className="btn btn-secondary text-dark nav-link-info " to='addevents'>
            Addevents
            </Link>
            <Link className="btn btn-secondary text-dark nav-link-info" to="viewevents">
              ViewEvents
            </Link>
          </nav>
          <Outlet/>{/* This will render the nested routes most importantone to be mentioned */}
        </div>
      </div>
    </div>
  );
}

export default Events;
