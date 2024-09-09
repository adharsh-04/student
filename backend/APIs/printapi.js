const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { ObjectId } = require('mongodb');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'print-files/'); // Renamed folder
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
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

function printapi(printCollection) {
    const router = express.Router();

    // Route to upload a PDF file and fill form details
    router.post('/upload', upload.single('file'), async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Save the file details and form data in MongoDB
            const fileData = {
                originalname: req.file.originalname,
                filename: req.file.filename,
                path: req.file.path,
                uploadDate: new Date(),
                formDetails: req.body, // This will store number of copies, color, etc.
            };

            const result = await printCollection.insertOne(fileData);

            // Schedule file deletion after 1 hour
            setTimeout(async () => {
                fs.unlink(fileData.path, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });
                await printCollection.deleteOne({ _id: result.insertedId });
            }, 60 * 60 * 1000); // 1 hour in milliseconds

            res.status(201).json({ message: 'File uploaded successfully', data: result });
        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ message: 'Error uploading file', error: error.message });
        }
    });

    // Route to get all print jobs
    router.get('/files', async (req, res) => {
        try {
            const files = await printCollection.find().sort({ uploadDate: -1 }).toArray();
            res.json(files);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching files' });
        }
    });

    // Route to preview/download a PDF file
    router.get('/preview/:id', async (req, res) => {
        const fileId = req.params.id;
        try {
            const file = await printCollection.findOne({ _id: new ObjectId(fileId) });
            if (!file) return res.status(404).json({ message: 'File not found' });

            const filePath = path.join(__dirname, '../print-files', file.filename);
            res.sendFile(filePath);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching file' });
        }
    });

    return router;
}

module.exports = printapi;
