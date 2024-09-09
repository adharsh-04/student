const express = require('express');
const multer = require('multer');
const path = require('path');
const { ObjectId } = require('mongodb');

// Setup multer for PDF file upload with unique filename
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // Files stored in uploads/ directory
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename on disk
        }
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    }
});

function fileapi(filesCollection) {
    const router = express.Router();

    // Route to upload a PDF file
    router.post('/upload', upload.single('file'), async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Save the file details in MongoDB, including the original filename
            const fileData = {
                originalname: req.file.originalname, // Original filename
                filename: req.file.filename, // Unique filename stored on disk
                path: req.file.path,
                uploadDate: new Date(),
            };

            const result = await filesCollection.insertOne(fileData);

            res.status(201).json({ message: 'File uploaded successfully', data: result });
        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ message: 'Error uploading file', error: error.message });
        }
    });

    // Route to retrieve all files from the collection
    router.get('/files', async (req, res) => {
        try {
            const files = await filesCollection.find().toArray(); // Get all files from DB
            res.json(files);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching files' });
        }
    });

    // Route to download a file by its ObjectId
    router.get('/download/:id', async (req, res) => {
        const fileId = req.params.id;

        try {
            const file = await filesCollection.findOne({ _id: new ObjectId(fileId) });
            if (!file) return res.status(404).json({ message: 'File not found' });

            const filePath = path.join(__dirname, '../uploads', file.filename); // Path to stored file

            // Send the file for download
            res.download(filePath, file.originalname, (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                    res.status(500).send('Error downloading file');
                }
            });
        } catch (error) {
            console.error('Error fetching file details:', error);
            res.status(500).send('Error fetching file details');
        }
    });

       

    return router;
}

module.exports = fileapi;
