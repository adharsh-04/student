const express = require('express');

function eventsapi(eventsCollection) {
    const router = express.Router();

    // Route to add a new event
    router.post('/addevent', async (req, res) => {
        const { eventname, eventdate } = req.body; // Destructure eventname and eventdate from body

        try {
            // Check if the event already exists with the same name and date
            const existingEvent = await eventsCollection.findOne({ eventname, eventdate });

            if (existingEvent) {
                return res.status(400).json({ message: 'Event already exists on the same date' });
            }

            // Insert new event data into the collection
            const result = await eventsCollection.insertOne(req.body);
            res.status(201).json({ message: 'Event added successfully', data: result });
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: 'An error occurred while adding the event' });
        }
    });

     // Route to get all users
     router.get('/events', async (req, res) => {
        try {
            // Fetch all users from the collection
            const eventsCursor = eventsCollection.find({}); // Returns a cursor to the documents
            const events = await eventsCursor.toArray(); // Convert cursor to array

            // Send the users as a JSON response
            res.status(200).json(events);
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).json({ message: 'Error fetching events', error: error.message });
        }
    });

    return router;
}

module.exports = eventsapi;
