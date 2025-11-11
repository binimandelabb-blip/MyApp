import React from 'react';
import './CrimeMap.css';

function CrimeMap({ crimes, onBack }) {
  return (
    <div className="crime-map">
      <div className="map-header">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <h2>Crime Map</h2>
      </div>

      <div className="map-container">
        <div className="map-placeholder">
          <div className="map-icon">🗺️</div>
          <h3>Interactive Crime Map</h3>
          <p>This would show crime locations on an interactive map</p>
        </div>

        <div className="map-legend">
          <h4>Crime Locations</h4>
          <div className="location-list">
            {crimes.map(crime => (
              <div key={crime.id} className="location-item">
                <span className="location-marker">📍</span>
                <div className="location-info">
                  <strong>{crime.location}</strong>
                  <span className="location-type">{crime.type}</span>
                  <span className="location-date">{crime.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="map-info">
        <div className="info-card">
          <h4>📊 Heat Zones</h4>
          <p>Identify areas with high crime rates</p>
        </div>
        <div className="info-card">
          <h4>🔔 Alerts</h4>
          <p>Get notified about crimes near you</p>
        </div>
        <div className="info-card">
          <h4>📈 Trends</h4>
          <p>View crime patterns over time</p>
        </div>
      </div>
    </div>
  );
}

export default CrimeMap;
