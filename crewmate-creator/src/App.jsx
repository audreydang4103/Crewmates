import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import CreateCrewmate from './components/CreateCrewmate';
import CrewmateGallery from './components/CrewmateGallery';
import CrewmateDetails from './components/CrewmateDetails';
import UpdateCrewmate from './components/UpdateCrewmate';

function App() {
  const [view, setView] = useState('home');
  const [selectedCrewmateId, setSelectedCrewmateId] = useState(null);

  const renderView = () => {
    switch (view) {
      case 'home':
        return <Home setView={setView} />;
      case 'create':
        return <CreateCrewmate setView={setView} />;
      case 'gallery':
        return <CrewmateGallery setView={setView} setSelectedCrewmateId={setSelectedCrewmateId} />;
      case 'details':
        return <CrewmateDetails crewmateId={selectedCrewmateId} setView={setView} />;
      case 'update':
        return <UpdateCrewmate crewmateId={selectedCrewmateId} setView={setView} />;
      default:
        return <Home setView={setView} />;
    }
  };

  return (
    <div className="App">
      <nav>
        <button onClick={() => setView('home')}>Home</button>
        <button onClick={() => setView('create')}>Create a Crewmate!</button>
        <button onClick={() => setView('gallery')}>Crewmate Gallery</button>
      </nav>
      {renderView()}
    </div>
  );
}

export default App;
