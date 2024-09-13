import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom'; // Add Outlet for nested routes
import axios from 'axios';

function Events() {
  const [events, setEvents] = useState([]);

  // Fetch events from the API when the component loads
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/eventsapi/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mt-2 mb-2">
      <div className="row">
        <div className="col-lg-12">

          {/* Navigation Buttons */}
          <nav className="d-flex justify-content-evenly mb-4">
            <Link className="btn btn-secondary text-dark nav-link-info" to="/events/addevents">
              Add Events
            </Link>
            <Link className="btn btn-secondary text-dark nav-link-info" to="/events/viewevents">
              View Events
            </Link>
          </nav>

          {/* Display Existing Events */}
          <div className="row">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event._id} className="col-md-4">
                  <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title text-primary">{event.eventName}</h5>
                      <p className="card-text"><strong>Organized By:</strong> {event.organizedBy}</p>
                      <p><strong>Registrations Available:</strong> {event.registrationsAvailable}</p>
                      <p><strong>Registration End Date:</strong> {new Date(event.registrationEndDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No events available at the moment.</p>
            )}
          </div>
          
          {/* Outlet for Nested Routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Events;
