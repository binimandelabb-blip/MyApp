import React, { useState } from 'react';
import './CrimeList.css';

function CrimeList({ crimes, onBack }) {
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredCrimes = crimes.filter(crime => 
    filterType === 'all' || crime.type === filterType
  );

  const sortedCrimes = [...filteredCrimes].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  const crimeTypes = ['all', ...new Set(crimes.map(c => c.type))];

  return (
    <div className="crime-list">
      <div className="list-header">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <h2>All Crime Reports</h2>
      </div>

      <div className="list-controls">
        <div className="filter-group">
          <label htmlFor="filter">Filter by Type:</label>
          <select 
            id="filter"
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
          >
            {crimeTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort">Sort by:</label>
          <select 
            id="sort"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date</option>
          </select>
        </div>

        <div className="results-count">
          Showing {sortedCrimes.length} of {crimes.length} reports
        </div>
      </div>

      <div className="crimes-grid">
        {sortedCrimes.length > 0 ? (
          sortedCrimes.map(crime => (
            <div key={crime.id} className="crime-detail-card">
              <div className="crime-header-row">
                <span className="crime-id">#{crime.id}</span>
                <span className={`crime-status status-${crime.status.toLowerCase().replace(' ', '-')}`}>
                  {crime.status}
                </span>
              </div>
              
              <h3 className="crime-title">{crime.type}</h3>
              
              <div className="crime-info-row">
                <span className="info-item">
                  📍 {crime.location}
                </span>
              </div>
              
              <div className="crime-info-row">
                <span className="info-item">
                  📅 {crime.date}
                </span>
                {crime.time && (
                  <span className="info-item">
                    🕐 {crime.time}
                  </span>
                )}
              </div>
              
              <p className="crime-desc">{crime.description}</p>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No crimes found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CrimeList;
