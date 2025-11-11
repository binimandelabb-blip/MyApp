import React from 'react';
import './Home.css';

function Home({ setCurrentView, crimes }) {
  const recentCrimes = crimes.slice(0, 3);

  return (
    <div className="home">
      <div className="hero">
        <h2>Welcome to Crime Watch</h2>
        <p>Help keep your community safe by reporting and staying informed about local incidents</p>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary" onClick={() => setCurrentView('report')}>
          📝 Report a Crime
        </button>
        <button className="btn btn-secondary" onClick={() => setCurrentView('map')}>
          🗺️ View Crime Map
        </button>
        <button className="btn btn-secondary" onClick={() => setCurrentView('list')}>
          📋 All Reports
        </button>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>{crimes.length}</h3>
          <p>Total Reports</p>
        </div>
        <div className="stat-card">
          <h3>{crimes.filter(c => c.status === 'Under Investigation').length}</h3>
          <p>Under Investigation</p>
        </div>
        <div className="stat-card">
          <h3>{crimes.filter(c => c.status === 'Reported').length}</h3>
          <p>Pending Review</p>
        </div>
      </div>

      <div className="recent-crimes">
        <h3>Recent Reports</h3>
        {recentCrimes.length > 0 ? (
          <div className="crime-cards">
            {recentCrimes.map(crime => (
              <div key={crime.id} className="crime-card">
                <div className="crime-type">{crime.type}</div>
                <div className="crime-location">📍 {crime.location}</div>
                <div className="crime-description">{crime.description}</div>
                <div className="crime-meta">
                  <span>{crime.date}</span>
                  <span className={`status status-${crime.status.toLowerCase().replace(' ', '-')}`}>
                    {crime.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-crimes">No crimes reported yet</p>
        )}
      </div>
    </div>
  );
}

export default Home;
