import React, { useState } from 'react';
import axios from 'axios';
import '../addEvents/Addevents.css'; // Ensure these paths are correct
import './Addevents.css';

const branches = ['CSE', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Allied'];

const Addevents = () => {
    const [eventData, setEventData] = useState({
        eventName: '',
        eventPicture: null,
        organizedBy: '',
        facultyCoordinators: [''], // Start with one empty string
        registrationsAvailable: '',
        startDate: '',
        endDate: '',
        registrationEndDate: '',
        entryFee: '',
        availability: 'All',
        branchEligibility: [] // Store selected branches
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

    const addFacultyCoordinator = () => {
        setEventData({
            ...eventData,
            facultyCoordinators: [...eventData.facultyCoordinators, ''],
        });
    };

    const handleFileChange = (e) => {
        setEventData({ ...eventData, eventPicture: e.target.files[0] });
    };

    const handleBranchChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setEventData({ ...eventData, branchEligibility: selectedOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(eventData).forEach((key) => {
            if (key === 'facultyCoordinators') {
                eventData.facultyCoordinators.forEach((coord, index) => {
                    formData.append(`facultyCoordinator${index + 1}`, coord);
                });
            } else if (key === 'branchEligibility') {
                eventData.branchEligibility.forEach((branch, index) => {
                    formData.append(`branch${index + 1}`, branch);
                });
            } else {
                formData.append(key, eventData[key]);
            }
        });

        try {
            const response = await axios.post('http://localhost:3000/eventsapi/addevent', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201) {
                alert('Successfully Registered');
            }
        } catch (error) {
            console.error('Error registering event:', error);
            alert('Error registering event');
        }
    };

    return (
        <div id="container" style={{ width: "100vw" }}>
            <div id="image-section" style={{ width: "40vw" }}>
                <img
                    src='https://img.freepik.com/free-vector/silhouette-party-crowd-grunge-background_1048-2542.jpg'
                    alt='Event background'
                    className='w-50'
                    id='image'
                />
            </div>
            <div id="form-section" style={{ width: "60vw" }}>
                <form onSubmit={handleSubmit}>
                    <h3 className='text-center text-primary' style={{ fontFamily: "italic" }}>Event Registration Form</h3>
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
                            <div key={index} className="faculty-coordinator-container">
                                <input
                                    type="text"
                                    value={coord}
                                    onChange={(e) => handleFacultyCoordinatorChange(index, e.target.value)}
                                />
                                {index === eventData.facultyCoordinators.length - 1 && (
                                    <button type="button" className="add-faculty-btn" onClick={addFacultyCoordinator}>+</button>
                                )}
                            </div>
                        ))}
                    </label>
                    <label>
                        Start Date:
                        <input type="date" name="startDate" value={eventData.startDate} onChange={handleChange} required />
                    </label>
                    <label>
                        End Date:
                        <input type="date" name="endDate" value={eventData.endDate} onChange={handleChange} required />
                    </label>
                    <label>
                        Available Registrations:
                        <input type="number" name="registrationsAvailable" value={eventData.registrationsAvailable} onChange={handleChange} required />
                    </label>
                    <label>
                        Registration End Date:
                        <input type="date" name="registrationEndDate" value={eventData.registrationEndDate} onChange={handleChange} required />
                    </label>
                    <label>
                        Entry Fee (Optional):
                        <input type="number" name="entryFee" value={eventData.entryFee} onChange={handleChange} />
                    </label>
                    <label>
                        Eligibility:
                        <select
                            name="branchEligibility"
                            multiple
                            value={eventData.branchEligibility}
                            onChange={handleBranchChange}
                        >
                            {branches.map(branch => (
                                <option key={branch} value={branch}>
                                    {branch}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Register Event</button>
                </form>
            </div>
        </div>
    );
};

export default Addevents;
