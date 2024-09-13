const express = require('express');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const secretKey =process.env.SECRET_KEY; 

function userapi(usersCollection) {
    const router = express.Router();

    // Route to add a new user
    router.post('/new-user', async (req, res) => {
        const userData = req.body;
        const username = userData.username;
        const password = userData.password;

        try {
            // Check if the user already exists
            const existingUser = await usersCollection.findOne({ username });

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists with this username.' });
            }

           
            const hashedPassword = await bcrypt.hash(password, 10);

            
            const result = await usersCollection.insertOne({
                ...userData,
                password: hashedPassword 
            });
            res.status(201).json({ message: 'User added successfully', data: result });
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: 'An error occurred while adding the user' });
        }
    });

    router.post('/login', async (req, res) => {
      const { username, password } = req.body;
  
      try {
          const user = await usersCollection.findOne({ username });
  
          if (!user) {
              return res.status(400).json({ message: 'Invalid username or password' });
          }
  
          const isPasswordValid = await bcrypt.compare(password, user.password);
  
          if (!isPasswordValid) {
              return res.status(400).json({ message: 'Invalid username or password' });
          }
  
          const token = jwt.sign(
              { userId: user._id, username: user.username }, // Include username in token
              secretKey, 
              { expiresIn: '1h' }
          );
  
          res.status(200).json({ message: 'Login successful', token, username: user.username }); // Include username in response
      } catch (error) {
          console.error('Error during login:', error);
          res.status(500).json({ message: 'Error during login', error: error.message });
      }
  });
  

 
    router.get('/users', async (req, res) => {
        try {
           
            const usersCursor = usersCollection.find({});
            const users = await usersCursor.toArray();

            
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    });

    return router;
}

module.exports = userapi;
