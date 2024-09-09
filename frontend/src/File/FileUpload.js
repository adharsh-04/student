import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3000/fileapi/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(`Error uploading file: ${error.response?.data?.message || error.message}`);
        }
        
    };

    return (
        <div className="container mt-5">
    <div className="card shadow-lg">
        <div className="card-body">
            <h2 className="text-center mb-4">Upload File</h2>
            <div className="mb-3">
                <label htmlFor="fileInput" className="form-label">Choose File</label>
                <input
                    type="file"
                    className="form-control"
                    id="fileInput"
                    onChange={handleFileChange}
                />
            </div>
            <div className="text-center">
                <button
                    className="btn btn-primary"
                    onClick={handleFileUpload}
                >
                    Upload
                </button>
            </div>
            <div className="mt-3 text-center">
                <p className="text-success">{message}</p>
            </div>
        </div>
    </div>
</div>

    );
}

export default FileUpload;