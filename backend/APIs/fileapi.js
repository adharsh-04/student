const express = require('express');
const multer = require('multer');
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // Folder where the PDF will be saved
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname)); // Save file with a unique name
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true); // Accept PDF only
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
                filename: req.file.filename, // Unique filename
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
    

    // Route to download a PDF file
    router.get('/download/:originalname', async (req, res) => {
        const { originalname } = req.params;
    
        try {
            // Fetch file details from the database
            const file = await filesCollection.findOne({ originalname });
            if (!file) {
                return res.status(404).send('File not found');
            }
    
            const filePath = path.join(__dirname, '../uploads', file.filename);
    
            res.download(filePath, (err) => {
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


//using post man
//http://localhost:3000/fileapi/download/akhilesh2.pdf get request to display the file in pdf format
//http://localhost:3000/fileapi/upload  select form-data,file , File,file from folders to store in database
//always use orignal filename in order to retreive that file successfully 
