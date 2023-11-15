import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreateTrip from './trips';
import TripList from './tripList';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <CreateTrip />
    <TripList />
  </React.StrictMode>
);

