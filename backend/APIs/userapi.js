const express = require('express');

function userapi(usersCollection) {
    const router = express.Router();

    // Testing route
    router.get('/test', (req, res) => {
        res.send("Request from userapi");
    });

    // Route to add a new user
    router.post('/new-user', async (req, res) => {
        const userData = req.body;
        const username = userData.username; // assuming the username is passed in the body

        try {
            // Check if the user already exists
            const existingUser = await usersCollection.findOne({ username });

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists with this username.' });
            }

            // Insert new user data into the collection
            const result = await usersCollection.insertOne(userData);
            res.status(201).json({ message: 'User added successfully', data: result });
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: 'An error occurred while adding the user' });
        }
    });

    return router;
}

module.exports = userapi;
