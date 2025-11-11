import React, { useState } from 'react';
import './ReportCrime.css';

function ReportCrime({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    date: '',
    time: '',
    description: ''
  });

  const crimeTypes = [
    'Theft',
    'Burglary',
    'Vandalism',
    'Assault',
    'Robbery',
    'Vehicle Theft',
    'Suspicious Activity',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.type && formData.location && formData.date && formData.description) {
      onSubmit(formData);
      setFormData({
        type: '',
        location: '',
        date: '',
        time: '',
        description: ''
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="report-crime">
      <div className="report-header">
        <h2>Report a Crime</h2>
        <p>Help your community by reporting suspicious activities or crimes</p>
      </div>

      <form onSubmit={handleSubmit} className="crime-form">
        <div className="form-group">
          <label htmlFor="type">Crime Type *</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select a type</option>
            {crimeTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter the location (e.g., Main Street, Central Park)"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide detailed information about the incident..."
            rows="5"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-submit">
            Submit Report
          </button>
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportCrime;
