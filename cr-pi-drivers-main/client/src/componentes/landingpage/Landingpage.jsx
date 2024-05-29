import React from 'react';
import { Link } from 'react-router-dom';
import './landingPage.css'; 

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1 className="title">F1</h1>
      <p className="description">Lo mejor de la formula 1!</p>
      <Link to="/drivers" className="button-link">
        <button className="button">Ingresar</button>
      </Link>
    </div>
  );
};

export default LandingPage;
