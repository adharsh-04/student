const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
const cors = require('cors');
const path = require('path');

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

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

        const database = client.db("student");
        const usersCollection = database.collection("usersCollection");
        const eventsCollection= database.collection("eventsCollection");
        const scholarshipsCollection=database.collection("scholarshipsCollection");
        const filesCollection=database.collection("filesCollection");
        const printCollection=database.collection("printCollection");

        // Import userapi and pass the usersCollection
        const userapi = require('../backend/APIs/userapi')(usersCollection);
        const eventsapi=require('../backend/APIs/eventsapi')(eventsCollection);
        const scholarshipsapi=require('../backend/APIs/scholarshipapi')(scholarshipsCollection);
        const fileapi=require('../backend/APIs/fileapi')(filesCollection);
        const printapi=require('../backend/APIs/printapi')(printCollection)

        // Use the userapi routes
        app.use('/userapi', userapi);
        app.use('/eventsapi',eventsapi);
        app.use('/scholarshipapi',scholarshipsapi)
        app.use('/fileapi',fileapi);
        app.use('/printapi',printapi);

// Serve static files from the 'event-images' directory
app.use('/event-images', express.static(path.join(__dirname, 'event-images')));

 // Serve static files from the React build directory
 app.use(express.static(path.join(__dirname, '../frontend/build')));

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
