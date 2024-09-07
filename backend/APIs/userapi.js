const express = require('express');

function userapi(usersCollection) {
    const router = express.Router();

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

    // Route to get all users
    router.get('/users', async (req, res) => {
        try {
            // Fetch all users from the collection
            const usersCursor = usersCollection.find({}); // Returns a cursor to the documents
            const users = await usersCursor.toArray(); // Convert cursor to array

            // Send the users as a JSON response
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    });

    return router;
}

module.exports = userapi;
