const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json()); // For parsing application/json

// Serve static files from the 'event-images' directory
app.use('/event-images', express.static(path.join(__dirname, 'event-images')));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'event-images/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

function eventsapi(eventsCollection) {
    const router = express.Router();

    // Route to add a new event
    router.post('/addevent', upload.single('eventPicture'), async (req, res) => {
        const { eventName, startDate, endDate, organizedBy, registrationsAvailable, registrationEndDate, entryFee, availability } = req.body;
        const eventPicture = req.file ? req.file.filename : null;

        try {
            // Check if the event already exists with the same name and date
            const existingEvent = await eventsCollection.findOne({ eventName, startDate, endDate });

            if (existingEvent) {
                return res.status(400).json({ message: 'Event already exists on the same date' });
            }

            // Insert new event data into the collection
            const result = await eventsCollection.insertOne({
                eventName,
                startDate,
                endDate,
                organizedBy,
                registrationsAvailable,
                registrationEndDate,
                entryFee,
                availability,
                eventPicture // Save the filename of the uploaded image
            });

            res.status(201).json({ message: 'Event added successfully', data: result });
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: 'An error occurred while adding the event' });
        }
    });

    // Route to get all events
    router.get('/events', async (req, res) => {
        try {
            const eventsCursor = eventsCollection.find({});
            const events = await eventsCursor.toArray();

            res.status(200).json(events);
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).json({ message: 'Error fetching events', error: error.message });
        }
    });

    return router;
}

module.exports = eventsapi;

// Add your MongoDB connection code and listen to the server here
