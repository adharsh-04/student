import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './FileUpload.css'; // Custom CSS for styling

function FileUpload() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]); // Initialize as an empty array
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1); // Pagination state
    const [totalPages, setTotalPages] = useState(1); // Total pages state

    // Memoize fetchFiles function
    const fetchFiles = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/fileapi/files', {
                params: { page, limit: 5 }, // Limit to 5 files per page
            });
            setFiles(response.data.files || []); // Ensure files is always an array
            setTotalPages(response.data.totalPages || 1); // Default to 1 page if undefined
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    }, [page]);

    // Memoize fetchSearchedFiles function
    const fetchSearchedFiles = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/fileapi/search', {
                params: { query: searchQuery }
            });
            setFiles(response.data || []); // Ensure files is always an array
            setTotalPages(1); // Reset pagination for search results
        } catch (error) {
            console.error('Error searching files:', error);
        }
    }, [searchQuery]);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]); // Add fetchFiles to the dependency array

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

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="file-upload-container mt-5 mb-2 ">
            <h2>Upload File</h2>
            <div className="upload-section">
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Upload</button>
            </div>
            <p>{message}</p>

            <h4>Search Files</h4>
            <input
                type="text"
                placeholder="Search by filename"
                value={searchQuery}
                onChange={handleSearchChange}
            />

            <h4>Files</h4>
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

            <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => handlePageChange(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FileUpload;
