import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Detail from './componentes/detail/detail';
import LandingPage from './componentes/landingpage/Landingpage';
import NavBar from './componentes/navBar/NavBar';
import Create from './componentes/form/Create';
import Home from './componentes/home/Home'; // Asegúrate de que la ruta del componente Home sea correcta
import axios from 'axios';
function App() {



  return (
    <>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/drivers" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
