import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Viewevents.css'; // Ensure this CSS file is included for styling

const Viewevents = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

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

    return (
        <div className="events-container">
            <div className="events-list">
                {events.map((event) => (
                    <div key={event._id} className="event-card" onClick={() => handleEventClick(event)}>
                        <h4>{event.eventName}</h4>
                        <p><strong>Organized By:</strong> {event.organizedBy}</p>
                        <p><strong>Registrations Available:</strong> {event.registrationsAvailable}</p>
                        <p><strong>Registration End Date:</strong> {event.registrationEndDate}</p>
                        {event.eventPicture && (
                            <img
                                src={`http://localhost:3000/event-images/${event.eventPicture}`}
                                alt={event.eventName}
                                className="event-image-thumbnail"
                            />
                        )}
                    </div>
                ))}
            </div>

            {selectedEvent && (
                <div className="event-details">
                    <button className="close-button" onClick={handleClose}>×</button>
                    <h2>{selectedEvent.eventName}</h2>
                    <p><strong>Organized By:</strong> {selectedEvent.organizedBy}</p>
                    <p><strong>Start Date:</strong> {new Date(selectedEvent.startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(selectedEvent.endDate).toLocaleDateString()}</p>
                    <p><strong>Registrations Available:</strong> {selectedEvent.registrationsAvailable}</p>
                    <p><strong>Registration End Date:</strong> {new Date(selectedEvent.registrationEndDate).toLocaleDateString()}</p>
                    <p><strong>Entry Fee:</strong> {selectedEvent.entryFee || 'Free'}</p>
                    <p><strong>Availability:</strong> {selectedEvent.availability}</p>
                    {selectedEvent.eventPicture && (
                        <img
                            src={`http://localhost:3000/event-images/${selectedEvent.eventPicture}`}
                            alt={selectedEvent.eventName}
                            className="event-image-large"
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Viewevents;
