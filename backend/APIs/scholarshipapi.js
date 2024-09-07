const express=require("express");

function scholarshipapi(scholarshipsCollection) {
    const router = express.Router();

    // Route to add a new event
    router.post('/addscholarship', async (req, res) => {
        const {name } = req.body; // Destructure eventname and eventdate from body

        try {
            // Check if the event already exists with the same name and date
            const existingEvent = await scholarshipsCollection.findOne({ name});

            if (existingEvent) {
                return res.status(400).json({ message: 'scholarship already exists ' });
            }

            // Insert new event data into the collection
            const result = await scholarshipsCollection.insertOne(req.body);
            res.status(201).json({ message: 'scholarship added successfully', data: result });
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: 'An error occurred while adding the scholarship' });
        }
    });

     // Route to get all users
     router.get('/scholarships', async (req, res) => {
        try {
            // Fetch all users from the collection
            const scholarshipCursor = scholarshipsCollection.find({}); // Returns a cursor to the documents
            const scholarship = await scholarshipCursor.toArray(); // Convert cursor to array

            // Send the users as a JSON response
            res.status(200).json(scholarship);
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).json({ message: 'Error fetching events', error: error.message });
        }
    });

    return router;
}


module.exports=scholarshipapi;