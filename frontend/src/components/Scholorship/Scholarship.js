import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Scholarship.css'; // Create a custom CSS file for extra styles

const ScholarshipsPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [newScholarship, setNewScholarship] = useState({
    id: '',
    name: '',
    description: '',
    amount: '',
    eligibility: '',
    deadline: '',
    requiredDocuments: []
  });
  const [documentInput, setDocumentInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [viewMode, setViewMode] = useState('view'); // Toggle between 'view' and 'add'

  // Fetch scholarships on load
  useEffect(() => {
    axios.get('http://localhost:3000/scholarshipapi/scholarships')
      .then(response => setScholarships(response.data))
      .catch(error => console.error('Error fetching scholarships:', error));
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setNewScholarship({
      ...newScholarship,
      [e.target.name]: e.target.value
    });
  };

  const handleAddDocument = () => {
    if (documentInput) {
      setNewScholarship({
        ...newScholarship,
        requiredDocuments: [...newScholarship.requiredDocuments, documentInput]
      });
      setDocumentInput(''); // Clear the input after adding
    }
  };

  // Submit new scholarship
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/scholarshipapi/addscholarship', newScholarship)
      .then(response => {
        alert('Scholarship added successfully');
        setScholarships([...scholarships, response.data.data]);
        setNewScholarship({
          id: '',
          name: '',
          description: '',
          amount: '',
          eligibility: '',
          deadline: '',
          requiredDocuments: []
        });
        setViewMode('view'); // Switch back to viewing scholarships after successful addition
      })
      .catch(error => {
        setErrorMessage(error.response?.data?.message || 'Error adding scholarship');
      });
  };

  return (
    <div className="container mt-2 mb-2">
      <h1 className="my-4 text-center">Scholarships Management</h1>

      {/* Toggle Buttons for Viewing and Adding Scholarships */}
      <div className="text-center mb-4">
        <button className="btn btn-primary mx-2" onClick={() => setViewMode('add')}>
          <i className="fas fa-plus"></i> Add Scholarship
        </button>
        <button className="btn btn-secondary mx-2" onClick={() => setViewMode('view')}>
          <i className="fas fa-eye"></i> View Scholarships
        </button>
      </div>

      {/* Conditionally render content based on the viewMode */}
      {viewMode === 'view' && (
        <div className="row">
          {/* Display existing scholarships */}
          {scholarships.length > 0 ? scholarships.map((scholarship, index) => (
            <div key={index} className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{scholarship.name}</h5>
                  <p className="card-text">{scholarship.description}</p>
                  <p><strong>Amount:</strong> <span className="text-success">${scholarship.amount}</span></p>
                  <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                  <p><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</p>
                  <p><strong>Required Documents:</strong></p>
                  <ul>
                    {scholarship.requiredDocuments.map((doc, i) => <li key={i}>{doc}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )) : <p className="text-center">No scholarships available.</p>}
        </div>
      )}

      {viewMode === 'add' && (
        <div className="card p-4 shadow-sm">
          {/* Form to add new scholarship */}
          <h2 className="text-center my-4">Add New Scholarship</h2>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>ID</label>
              <input type="number" name="id" className="form-control" value={newScholarship.id} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label>Name</label>
              <input type="text" name="name" className="form-control" value={newScholarship.name} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea name="description" className="form-control" value={newScholarship.description} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label>Amount</label>
              <input type="number" name="amount" className="form-control" value={newScholarship.amount} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label>Eligibility</label>
              <input type="text" name="eligibility" className="form-control" value={newScholarship.eligibility} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label>Deadline</label>
              <input type="date" name="deadline" className="form-control" value={newScholarship.deadline} onChange={handleChange} required />
            </div>
            <div className="form-group mb-3">
              <label>Required Documents</label>
              <input type="text" className="form-control" value={documentInput} onChange={(e) => setDocumentInput(e.target.value)} />
              <button type="button" className="btn btn-secondary mt-2" onClick={handleAddDocument}>Add Document</button>
            </div>
            <ul>
              {newScholarship.requiredDocuments.map((doc, index) => <li key={index}>{doc}</li>)}
            </ul>

            <button type="submit" className="btn btn-success w-100 mt-4">Add Scholarship</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ScholarshipsPage;
