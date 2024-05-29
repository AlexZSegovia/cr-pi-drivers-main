import React from 'react';
import { Link } from 'react-router-dom';
import FilterBar from '../FilterBar/FilterBar';
import './navbar.css';

const NavBar = ({ handlechange, handleSubmit, handleOrderChange, handleFilterChange }) => {
  const handleHomeClick = () => {
    if (window.location.pathname !== '/drivers') {
      window.location.href = '/drivers';
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="navBar">
      {window.location.pathname === '/drivers' && (
        <form onChange={handlechange} onSubmit={handleSubmit}>
          <input placeholder="busqueda" type="Search" />
          <button type="submit">Buscar</button>
        </form>
      )}
      {window.location.pathname === '/drivers' && (
         <FilterBar handleOrderChange={handleOrderChange} handleFilterChange={handleFilterChange} />
      )}
      
      <div className="button-container">
        <button className="button" onClick={handleHomeClick}>Home</button>
        <Link to="/"><button className="button">Volver al inicio</button></Link>
        <Link to="/create"><button className="button">Crear</button></Link>
      </div>
    </div>
  );
};

export default NavBar;
