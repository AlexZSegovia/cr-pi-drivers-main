import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDriver } from '../redux/action';
import './create.css';
import NavBar from "../navBar/NavBar"

const FormularioCrearPiloto = () => {
  const [input, setInput] = useState({
    forename: '',
    surname: '',
    nationality: '',
    image: '',
    dob: '',
    description: '',
    teams: [],
  });

  const [error, setError] = useState({
    forename: '*',
    surname: '*',
    nationality: '*',
    image: 'Opcional',
    dob: '*',
    description: '*',
    teams: '*',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'teams') {
      const selectedTeams = [...input.teams];
      if (selectedTeams.includes(value)) {
        selectedTeams.splice(selectedTeams.indexOf(value), 1);
      } else {
        selectedTeams.push(value);
      }
      setInput({
        ...input,
        teams: selectedTeams,
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }

    if (!value && name !== 'teams') {
      setError({
        ...error,
        [name]: 'Este campo es requerido',
      });
    } else {
      setError({
        ...error,
        [name]: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let formIsValid = true;
    let newError = { ...error };
  
    Object.keys(input).forEach((key) => {
      if (key !== 'image' && !input[key]) {
        newError[key] = 'Este campo es requerido';
        formIsValid = false;
      }
    });
  
    setError(newError);
  
    if (formIsValid) {
      const driverData = {
        ...input,
        teams: input.teams.join(', '), // Transformar el array a una cadena de texto
      };
  
      dispatch(addDriver(driverData));
      console.log('Datos del piloto:', driverData);
    }
  };
  
  return (
    <div>
      <NavBar/>
      <div className="form-container">
        <h2>Crear Nuevo Piloto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Apellido </label>
            <input type="text" name="forename" value={input.forename} onChange={handleChange} />
            {error.forename && <span className="error-message">{error.forename}</span>}
          </div>
          <div className="form-group">
            <label>Nombre </label>
            <input type="text" name="surname" value={input.surname} onChange={handleChange} />
            {error.surname && <span className="error-message">{error.surname}</span>}
          </div>
          <div className="form-group">
            <label>Nacionalidad</label>
            <input type="text" name="nationality" value={input.nationality} onChange={handleChange} />
            {error.nationality && <span className="error-message">{error.nationality}</span>}
          </div>
          <div className="form-group">
            <label>Imagen</label>
            <input type="text" name="image" value={input.image} onChange={handleChange} />
            {error.image && <span className="error-message">{error.image}</span>}
          </div>
          <div className="form-group">
            <label>Fecha de Nacimiento</label>
            <input type="date" name="dob" value={input.dob} onChange={handleChange} />
            {error.dob && <span className="error-message">{error.dob}</span>}
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea name="description" value={input.description} onChange={handleChange}></textarea>
            {error.description && <span className="error-message">{error.description}</span>}
          </div>
          <div className="form-group">
            <label>Escudería</label>
            <select name="teams" value={input.teams} onChange={handleChange} multiple>
              <option value="">Selecciona un equipo</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Alpine">Alpine</option>
              <option value="Hass">Hass</option>
              <option value="Red Bull">Red Bull</option>
              <option value="Mclaren">Mc laren</option>
              <option value="Aston Martin">Aston Martin</option>
              <option value="RB">RB</option>
              <option value="Ferrari">Ferrari</option>
              <option value="Williams">Williams</option>
              <option value="Kick Sauber">Kick Sauber</option>
            </select>
            {error.teams && <span className="error-message">{error.teams}</span>}
          </div>
          <div className="btn-container">
            <button type="submit">Crear Piloto</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCrearPiloto;
