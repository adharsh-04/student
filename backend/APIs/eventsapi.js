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

    return router;
}

module.exports = eventsapi;
