import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileUpload.css'; // Custom CSS for styling

function FileUpload() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axios.get('http://localhost:3000/fileapi/files');
            const sortedFiles = response.data.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
            setFiles(sortedFiles);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const fetchSearchedFiles = async () => {
        try {
            const response = await axios.get('http://localhost:3000/fileapi/search', {
                params: { query: searchQuery }
            });
            const sortedFiles = response.data.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
            setFiles(sortedFiles);
        } catch (error) {
            console.error('Error searching files:', error);
        }
    };

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
            setFile(null);
            fetchFiles(); // Fetch the files again to display the uploaded file
        } catch (error) {
            setMessage(`Error uploading file: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        fetchSearchedFiles();
    };

    const handleDownload = async (fileId, originalname) => {
        try {
            const response = await axios.get(`http://localhost:3000/fileapi/download/${fileId}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', originalname);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            setMessage(`Error downloading file: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="file-upload-container">
            <h2>Upload File</h2>
            <div className="upload-section">
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Upload</button>
            </div>
            <p>{message}</p>

            <h3>Search Files</h3>
            <input
                type="text"
                placeholder="Search by filename"
                value={searchQuery}
                onChange={handleSearchChange}
            />

            <h3>Files</h3>
            <div className="files-list">
                {files.length === 0 ? (
                    <p>No files available</p>
                ) : (
                    files.map((file, index) => (
                        <div key={index} className="file-item">
                            <span>{file.originalname}</span>
                            <button onClick={() => handleDownload(file._id, file.originalname)}>Download</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default FileUpload;
