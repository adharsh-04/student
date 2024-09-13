import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Viewevents.css'; // Ensure this CSS file is included for styling
import { useNavigate } from 'react-router-dom'; // Use useNavigate from react-router-dom in v6

const Viewevents = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();  // Using useNavigate to handle routing

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

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleClose = () => {
        setSelectedEvent(null);
    };

    // Function to navigate to the registration form
    const handleRegisterClick = () => {
        navigate('/eventregister');  // Replace with your registration form route
    };

    return (
        <div className="events-container mt-2">
            {events.map((event) => (
                <div key={event._id} className="event-card" onClick={() => handleEventClick(event)}>
                    <div className="event-image">
                        {event.eventPicture && (
                            <img
                                src={`http://localhost:3000/event-images/${event.eventPicture}`} // Make sure this path is correct
                                alt={event.eventName}
                                className="event-image-thumbnail"
                            />
                        )}
                    </div>
                    <div className="event-details-summary">
                        <h4>{event.eventName}</h4>
                        <p><strong>Organized By:</strong> {event.organizedBy}</p>
                        <p><strong>Registrations Available:</strong> {event.registrationsAvailable}</p>
                        <p><strong>Registration End Date:</strong> {new Date(event.registrationEndDate).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}

            {selectedEvent && (
                <div className="event-details">
                    <button className="close-button" onClick={handleClose}>×</button>
                    
                    {/* Event Image First */}
                    {selectedEvent.eventPicture && (
                        <img
                            src={`http://localhost:3000/event-images/${selectedEvent.eventPicture}`} // Make sure this path is correct
                            alt={selectedEvent.eventName}
                            className="event-image-large"
                        />
                    )}

                    {/* Event Details with Professional Styling */}
                    <div className="event-info">
                        <h2 className="event-title">{selectedEvent.eventName}</h2>
                        <p className="event-organized"><strong>Organized By:</strong> {selectedEvent.organizedBy}</p>
                        <p><strong>Start Date:</strong> {new Date(selectedEvent.startDate).toLocaleDateString()}</p>
                        <p><strong>End Date:</strong> {new Date(selectedEvent.endDate).toLocaleDateString()}</p>
                        <p><strong>Registrations Available:</strong> {selectedEvent.registrationsAvailable}</p>
                        <p><strong>Registration End Date:</strong> {new Date(selectedEvent.registrationEndDate).toLocaleDateString()}</p>
                        <p><strong>Entry Fee:</strong> {selectedEvent.entryFee || 'Free'}</p>
                        <p><strong>Availability:</strong> {selectedEvent.availability}</p>
                    </div>

                    {/* Register Button */}
                    <button className="register-button" onClick={handleRegisterClick}>Register Here</button>
                </div>
            )}
        </div>
    );
};

export default Viewevents;
