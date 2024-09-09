import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Viewevents/Viewevents.css';

const ViewEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        

        fetchEvents();
    }, []);

    return (
        <div id="events-container">
            <h2 className="text-center">Upcoming Events</h2>
            <div className="events-grid">
                {events.length === 0 ? (
                    <p>No events available</p>
                ) : (
                    events.map((event, index) => (
                        <div key={index} className="event-card">
                            <img 
                                src={event.eventPicture ? `/uploads/${event.eventPicture}` : 'default-image-path.jpg'} 
                                alt={event.eventName} 
                                className="event-image" 
                            />
                            <div className="event-details">
                                <h3>{event.eventName}</h3>
                                <p>Organized By: {event.organizedBy}</p>
                                {event.facultyCoordinators.filter(Boolean).length > 0 && (
                                    <p>Faculty Coordinators: {event.facultyCoordinators.join(', ')}</p>
                                )}
                                {event.registrationsAvailable && (
                                    <p>Registrations Available: {event.registrationsAvailable}</p>
                                )}
                                <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
                                <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
                                <p>Registration Ends: {new Date(event.registrationEndDate).toLocaleDateString()}</p>
                                {event.entryFee && <p>Entry Fee: ₹{event.entryFee}</p>}
                                <p>Availability: {event.availability}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewEvents;
