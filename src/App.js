import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import ReportCrime from './components/ReportCrime';
import CrimeMap from './components/CrimeMap';
import CrimeList from './components/CrimeList';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [crimes, setCrimes] = useState([
    {
      id: 1,
      type: 'Theft',
      description: 'Bicycle stolen from park',
      location: 'Central Park',
      date: '2025-11-10',
      time: '14:30',
      status: 'Reported'
    },
    {
      id: 2,
      type: 'Vandalism',
      description: 'Graffiti on building wall',
      location: 'Main Street',
      date: '2025-11-09',
      time: '22:00',
      status: 'Under Investigation'
    }
  ]);

  const addCrime = (crime) => {
    const newCrime = {
      ...crime,
      id: crimes.length + 1,
      status: 'Reported'
    };
    setCrimes([newCrime, ...crimes]);
    setCurrentView('home');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home setCurrentView={setCurrentView} crimes={crimes} />;
      case 'report':
        return <ReportCrime onSubmit={addCrime} onCancel={() => setCurrentView('home')} />;
      case 'map':
        return <CrimeMap crimes={crimes} onBack={() => setCurrentView('home')} />;
      case 'list':
        return <CrimeList crimes={crimes} onBack={() => setCurrentView('home')} />;
      default:
        return <Home setCurrentView={setCurrentView} crimes={crimes} />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚨 Crime Watch</h1>
        <p className="subtitle">Community Safety Network</p>
      </header>
      <main className="App-main">
        {renderView()}
      </main>
      <footer className="App-footer">
        <p>© 2025 Crime Watch App - Keep your community safe</p>
      </footer>
    </div>
  );
}

export default App;
