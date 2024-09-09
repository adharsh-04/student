import React, { useState } from 'react';
import axios from 'axios';

function FileDownload() {
    const [filename, setFilename] = useState('');
    const [message, setMessage] = useState('');

    const handleFileDownload = async () => {
        if (!filename) {
            setMessage('Please enter a filename.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/fileapi/download/${filename}`, {
                responseType: 'blob' // Important for handling binary data
            });
            
            // Create a link element to download the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            
            setMessage('File downloaded successfully.');
        } catch (error) {
            setMessage('Error downloading file.');
        }
    };

    return (
        <div className="container mt-5">
    <div className="card shadow-lg">
        <div className="card-body">
            <h2 className="text-center mb-4">Download File</h2>
            <div className="mb-3">
                <label htmlFor="filenameInput" className="form-label">Enter Filename</label>
                <input
                    type="text"
                    className="form-control"
                    id="filenameInput"
                    placeholder="Enter filename"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                />
            </div>
            <div className="text-center">
                <button
                    className="btn btn-success"
                    onClick={handleFileDownload}
                >
                    Download
                </button>
            </div>
            <div className="mt-3 text-center">
                <p className="text-info">{message}</p>
            </div>
        </div>
    </div>
</div>

    );
}

export default FileDownload;