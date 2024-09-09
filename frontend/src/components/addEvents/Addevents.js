import React, { useState } from 'react';
import axios from 'axios';
import '../addEvents/Addevents.css';

const AddEvents = () => {
    const [eventData, setEventData] = useState({
        eventName: '',
        eventPicture: null,
        organizedBy: '',
        facultyCoordinators: ['', '', ''],
        registrationsAvailable: '',
        startDate: '',
        endDate: '',
        registrationEndDate: '',
        entryFee: '',
        availability: 'All',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleFacultyCoordinatorChange = (index, value) => {
        const newFacultyCoordinators = [...eventData.facultyCoordinators];
        newFacultyCoordinators[index] = value;
        setEventData({ ...eventData, facultyCoordinators: newFacultyCoordinators });
    };

    const handleFileChange = (e) => {
        setEventData({ ...eventData, eventPicture: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(eventData).forEach((key) => {
            if (key === 'facultyCoordinators') {
                eventData.facultyCoordinators.forEach((coord, index) => {
                    formData.append(`facultyCoordinator${index + 1}`, coord);
                });
            } else {
                formData.append(key, eventData[key]);
            }
        });

        try {
            const response = await axios.post('/api/events', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (eventData.entryFee) {
                window.location.href = '/payment';
            } else {
                alert('Successfully Registered');
            }
        } catch (error) {
            console.error('Error registering event:', error);
        }
    };

    return (
        <div id="container" style={{width:"100vw"}}>
            <div id="image-section" style={{width:"50vw"}}>
                <img src='https://img.freepik.com/free-vector/silhouette-party-crowd-grunge-background_1048-2542.jpg' alt='' className='w-50' id='image'/>
            </div>
            <div id="form-section" style={{width:"50vw"}}>
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center text-primary' style={{fontFamily:"italic"}}>Event Registration Form</h3>
                    <label>
                        Event Name:
                        <input type="text" name="eventName" value={eventData.eventName} onChange={handleChange} required />
                    </label>
                    <label>
                        Event Picture:
                        <input type="file" name="eventPicture" onChange={handleFileChange} />
                    </label>
                    <label>
                        Organized By:
                        <input type="text" name="organizedBy" value={eventData.organizedBy} onChange={handleChange} required />
                    </label>
                    <label>
                        Faculty Coordinators:
                        {eventData.facultyCoordinators.map((coord, index) => (
                            <input
                                key={index}
                                type="text"
                                value={coord}
                                onChange={(e) => handleFacultyCoordinatorChange(index, e.target.value)}
                            />
                        ))}
                    </label>
                    <label>
                        Registrations Available:
                        <input type="number" name="registrationsAvailable" value={eventData.registrationsAvailable} onChange={handleChange} />
                    </label>
                    <label>
                        Event Start Date:
                        <input type="date" name="startDate" value={eventData.startDate} onChange={handleChange} required />
                    </label>
                    <label>
                        Event End Date:
                        <input type="date" name="endDate" value={eventData.endDate} onChange={handleChange} required />
                    </label>
                    <label>
                        Registration End Date:
                        <input type="date" name="registrationEndDate" value={eventData.registrationEndDate} onChange={handleChange} required />
                    </label>
                    <label>
                        Entry Fee (optional):
                        <input type="number" name="entryFee" value={eventData.entryFee} onChange={handleChange} />
                    </label>
                    <label>
                        Availability:
                        <select name="availability" value={eventData.availability} onChange={handleChange}>
                            <option value="All">All Branches</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="EEE">EEE</option>
                            <option value="Mechanical">Mechanical</option>
                            <option value="Civil">Civil</option>
                            <option value="Allied">Allied Branches</option>
                        </select>
                    </label>
                    <button type="submit">Register Event</button>
                </form>
            </div>
        </div>
    );
};


export default AddEvents;
