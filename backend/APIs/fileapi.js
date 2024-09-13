const express = require('express');
const multer = require('multer');
const path = require('path');
const { ObjectId } = require('mongodb');
const fs = require('fs');

// Setup multer for PDF file upload
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // Ensure the uploads directory exists
            const uploadDir = path.join(__dirname, '../uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            cb(null, uploadDir); // Files stored in uploads/ directory
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
}).single('file');

function fileapi(filesCollection) {
    const router = express.Router();

    // Route to upload a PDF file
    router.post('/upload', (req, res) => {
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ message: `Multer error: ${err.message}` });
            } else if (err) {
                return res.status(500).json({ message: `Error uploading file: ${err.message}` });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Save the file details in MongoDB
            const fileData = {
                originalname: req.file.originalname,
                filename: req.file.filename,
                path: req.file.path,
                uploadDate: new Date(),
            };

            try {
                const result = await filesCollection.insertOne(fileData);
                res.status(201).json({ message: 'File uploaded successfully', data: result });
            } catch (error) {
                res.status(500).json({ message: 'Error saving file data', error: error.message });
            }
        });
    });

    // Route to retrieve files with pagination
    router.get('/files', async (req, res) => {
        const { page = 1, limit = 5 } = req.query;

        try {
            const files = await filesCollection
                .find()
                .skip((page - 1) * limit)
                .limit(parseInt(limit))
                .toArray();

            const totalFiles = await filesCollection.countDocuments();
            const totalPages = Math.ceil(totalFiles / limit);

            res.json({ files, totalPages });
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
            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ message: 'File not found on disk' });
            }

            res.download(filePath, file.originalname, (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                    res.status(500).send('Error downloading file');
                }
            });
        } catch (error) {
            res.status(500).send('Error fetching file details');
        }
    });

    return router;
}

module.exports = fileapi;
