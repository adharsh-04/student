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
        <div>
            <h2>Download File</h2>
            <input
                type="text"
                placeholder="Enter filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
            />
            <button onClick={handleFileDownload}>Download</button>
            <p>{message}</p>
        </div>
    );
}

export default FileDownload;