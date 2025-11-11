import React, { useState } from 'react';
import TipService from '../services/TipService';

const TipSubmissionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    crimeType: 'general',
    location: '',
    urgency: 'medium',
    isAnonymous: false,
    contactInfo: {
      name: '',
      phone: '',
      email: ''
    }
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const crimeTypes = [
    { value: 'theft', label: 'Theft/Burglary' },
    { value: 'robbery', label: 'Robbery' },
    { value: 'assault', label: 'Assault' },
    { value: 'drugs', label: 'Drug-related' },
    { value: 'vandalism', label: 'Vandalism' },
    { value: 'suspicious_activity', label: 'Suspicious Activity' },
    { value: 'fraud', label: 'Fraud' },
    { value: 'domestic_violence', label: 'Domestic Violence' },
    { value: 'traffic', label: 'Traffic Violation' },
    { value: 'general', label: 'General' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const result = await TipService.submitTip(formData);
      setMessage('Tip submitted successfully! Thank you for helping keep our community safe.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        crimeType: 'general',
        location: '',
        urgency: 'medium',
        isAnonymous: false,
        contactInfo: {
          name: '',
          phone: '',
          email: ''
        }
      });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    if (field.startsWith('contactInfo.')) {
      const contactField = field.split('.')[1];
      setFormData({
        ...formData,
        contactInfo: {
          ...formData.contactInfo,
          [contactField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  return (
    <div className="tip-submission-form">
      <h2>Submit a Crime Prevention Tip</h2>
      <p>Help keep our community safe by reporting suspicious activities or crimes.</p>
      
      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title (Optional)</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Brief title for the tip"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Provide detailed information about the incident or suspicious activity"
            required
            minLength="10"
            rows="5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="crimeType">Crime Type *</label>
          <select
            id="crimeType"
            value={formData.crimeType}
            onChange={(e) => handleChange('crimeType', e.target.value)}
            required
          >
            {crimeTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Where did this occur?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="urgency">Urgency Level *</label>
          <select
            id="urgency"
            value={formData.urgency}
            onChange={(e) => handleChange('urgency', e.target.value)}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={formData.isAnonymous}
              onChange={(e) => handleChange('isAnonymous', e.target.checked)}
            />
            Submit anonymously
          </label>
        </div>

        {!formData.isAnonymous && (
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p className="note">Your information will only be shared with authorized police personnel.</p>
            
            <div className="form-group">
              <label htmlFor="contactName">Name</label>
              <input
                type="text"
                id="contactName"
                value={formData.contactInfo.name}
                onChange={(e) => handleChange('contactInfo.name', e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactPhone">Phone</label>
              <input
                type="tel"
                id="contactPhone"
                value={formData.contactInfo.phone}
                onChange={(e) => handleChange('contactInfo.phone', e.target.value)}
                placeholder="+251911234567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactEmail">Email</label>
              <input
                type="email"
                id="contactEmail"
                value={formData.contactInfo.email}
                onChange={(e) => handleChange('contactInfo.email', e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        )}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Tip'}
        </button>
      </form>

      <div className="alternative-channels">
        <h3>Other Ways to Submit Tips</h3>
        <ul>
          <li><strong>Phone:</strong> Call our hotline at 911</li>
          <li><strong>SMS:</strong> Send a text message to our tip line</li>
          <li><strong>Web:</strong> Use our online form</li>
        </ul>
      </div>
    </div>
  );
};

export default TipSubmissionForm;
