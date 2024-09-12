import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function FileUploadForm() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [previewUrl, setPreviewUrl] = useState(null);
    const [printOptions, setPrintOptions] = useState({ copies: 1, color: 'black-and-white' });
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handlePrintOptionsChange = (e) => {
        const { name, value } = e.target;
        setPrintOptions({ ...printOptions, [name]: value });
    };

    const handleFileUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('copies', printOptions.copies);
        formData.append('color', printOptions.color);

        try {
            const response = await axios.post('http://localhost:3000/printapi/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage(response.data.message);
            fetchFiles(); // Fetch files again after uploading
        } catch (error) {
            setMessage(`Error uploading file: ${error.response?.data?.message || error.message}`);
        }
    };

    const fetchFiles = async () => {
        try {
            const response = await axios.get('http://localhost:3000/printapi/files');
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const handlePreview = async (id) => {
        setPreviewUrl(`http://localhost:3000/printapi/preview/${id}`);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="mb-4">Upload File</h2>
                <div className="mb-3">
                    <input type="file" className="form-control" onChange={handleFileChange} />
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Copies:</label>
                        <input type="number" name="copies" value={printOptions.copies} onChange={handlePrintOptionsChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Color or Black & White:</label>
                        <select name="color" value={printOptions.color} onChange={handlePrintOptionsChange} className="form-select">
                            <option value="black-and-white">Black & White</option>
                            <option value="color">Color</option>
                        </select>
                    </div>
                </div>
                <button onClick={handleFileUpload} className="btn btn-primary mb-3">Upload</button>
                {message && <div className="alert alert-info">{message}</div>}
            </div>

            {previewUrl && (
                <div className="card mt-4 shadow p-3">
                    <h3>PDF Preview</h3>
                    <iframe
                        src={previewUrl}
                        width="100%"
                        height="700px"  // Adjusted height here
                        title="PDF Preview"
                        className="border rounded shadow-sm"
                    ></iframe>
                </div>
            )}

            <div className="card mt-4 shadow p-3">
                <h3>Files</h3>
                <ul className="list-group">
                    {files.map((file) => (
                        <li key={file._id} className="list-group-item d-flex justify-content-between align-items-center">
                            {file.originalname}
                            <button onClick={() => handlePreview(file._id)} className="btn btn-outline-secondary w-50 ">Preview</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FileUploadForm;
