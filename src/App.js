import React from 'react';
import './App.css';
import ClaimForm from './components/ClaimForm';

function App() {
  return (
    <div className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <ClaimForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
