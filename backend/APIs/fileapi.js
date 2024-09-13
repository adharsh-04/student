const express = require('express');
const multer = require('multer');
const path = require('path');
const { ObjectId } = require('mongodb');
const fs = require('fs');

// Setup multer for PDF file upload
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

            const fileData = {
                originalname: req.file.originalname,
                filename: req.file.filename,
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

    // Route to retrieve all files
    router.get('/files', async (req, res) => {
        try {
            const files = await filesCollection.find().toArray();
            res.json(files);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching files' });
        }
    });

    // Route to search files by name
    router.get('/search', async (req, res) => {
        const { query } = req.query;
        try {
            const regex = new RegExp(query, 'i'); // Case-insensitive regex search
            const files = await filesCollection.find({ originalname: { $regex: regex } }).toArray();
            res.json(files);
        } catch (error) {
            res.status(500).json({ message: 'Error searching files', error: error.message });
        }
    });

    // Route to download a file by its ID
    router.get('/download/:id', async (req, res) => {
        const fileId = req.params.id;
        try {
            const file = await filesCollection.findOne({ _id: new ObjectId(fileId) });
            if (!file) return res.status(404).json({ message: 'File not found' });

            const filePath = path.join(__dirname, '../uploads', file.filename);
            
            if (fs.existsSync(filePath)) {
                res.download(filePath, file.originalname, (err) => {
                    if (err) {
                        console.error('Error downloading file:', err);
                        res.status(500).send('Error downloading file');
                    }
                });
            } else {
                res.status(404).json({ message: 'File not found on the server' });
            }
        } catch (error) {
            console.error('Error fetching file details:', error);
            res.status(500).send('Error fetching file details');
        }
    });

    return router;
}

module.exports = fileapi;
