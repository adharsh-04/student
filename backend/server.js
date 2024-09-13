const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
const cors = require('cors');
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// MongoDB connection setup
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URL;

if (!uri) {
    console.error('MONGO_URL environment variable is missing.');
    process.exit(1);
}

const client = new MongoClient(uri);

async function initializeDatabase() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('student');
        const usersCollection = database.collection('usersCollection');
        const eventsCollection = database.collection('eventsCollection');
        const scholarshipsCollection = database.collection('scholarshipsCollection');
        const filesCollection = database.collection('filesCollection');
        const printCollection = database.collection('printCollection');

        // Import API routes and pass the collections
        const userapi = require('./APIs/userapi')(usersCollection);
        const eventsapi = require('./APIs/eventsapi')(eventsCollection);
        const scholarshipsapi = require('./APIs/scholarshipapi')(scholarshipsCollection);
        const fileapi = require('./APIs/fileapi')(filesCollection);
        const printapi = require('./APIs/printapi')(printCollection);

        // Use API routes
        app.use('/userapi', userapi);
        app.use('/eventsapi', eventsapi);
        app.use('/scholarshipapi', scholarshipsapi);
        app.use('/fileapi', fileapi);
        app.use('/printapi', printapi);

        // Serve static files for event images
        app.use('/event-images', express.static(path.join(__dirname, 'event-images')));

        // Serve static files from the React build directory
        // app.use(express.static(path.join(__dirname, '../frontend/build')));
        app.use(express.static(path.join(__dirname,'../frontend/build')))

        // Serve the React app for any route that doesn't match an API route
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
        });

        // Start the server
        app.listen(port, () => console.log(`Server is running on port ${port}...`));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

initializeDatabase().catch(console.error);
