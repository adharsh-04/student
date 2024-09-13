import React, { useState } from 'react';
import axios from 'axios';
import './EventRegistrationForm.css';

const EventRegistrationForm = ({ eventId }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        college: '',
        branch: '',
        year: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');

        // Perform validation checks (optional, based on your requirements)
        if (!formData.name || !formData.email || !formData.contactNumber || !formData.college) {
            setErrorMessage('Please fill all required fields.');
            setIsSubmitting(false);
            return;
        }

        try {
            // Send form data to backend API (assuming you have an API endpoint)
            await axios.post('http://localhost:3000/eventsapi/register', {
                ...formData,
                eventId,  // Event ID to associate the registration with
            });

            setSuccessMessage('Registration successful!');
            setFormData({
                name: '',
                email: '',
                contactNumber: '',
                college: '',
                branch: '',
                year: '',
            });
        } catch (error) {
            console.error('Error submitting registration form:', error);
            setErrorMessage('An error occurred. Please try again.');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="registration-form-container">
            <h2>Event Registration</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="college">College Name:</label>
                    <input
                        type="text"
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="branch">Branch:</label>
                    <input
                        type="text"
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="year">Year of Study:</label>
                    <input
                        type="text"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default EventRegistrationForm;
