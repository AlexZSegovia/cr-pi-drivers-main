import React, { useState, useEffect } from 'react';
import NavBar from '../navBar/NavBar';
import Cards from '../Cards/Cards';
import './Home.css';
import { getDrivers, getByName } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
function Home() {
  const dispatch = useDispatch();
  const drivers = useSelector(state => state.drivers);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  function handlechange(e) {
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(searchString));
    setSearchString('');
  }

  const handleOrderChange = (value) => {
    if (value === "ASC" || value === "DESC") {
      //
    }
  };
  

  const handleFilterChange = (value) => {
    if (value === "Teams") {
      // Despachar acción de filtro por equipo
    } else if (value === "Api") {
      // Despachar acción de filtro por origen de API
    } else if (value === "BaseDeDatos") {
      // Despachar acción de filtro por origen de Base de Datos
    }
  };
  
  return (
    <div className="Home">
      <NavBar handlechange={handlechange} handleSubmit={handleSubmit} handleOrderChange={handleOrderChange} handleFilterChange={handleFilterChange} />
      <Cards drivers={drivers} />
    </div>
  );
}

export default Home;

