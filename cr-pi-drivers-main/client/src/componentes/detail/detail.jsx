
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getById } from '../redux/action';
import style from "./Detail.module.css";
import NavBar from '../navBar/NavBar';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driver = useSelector(state => state.drivers.find(driver => driver.id === id));

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);
  
  if (!driver || Object.keys(driver).length === 0) {
      return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar/>
      
         <div className={style.detailcard}>
    <div className={style.detailcontent}>
      <div className={style.detailtext}>
          <h2>{driver.forename}</h2>
           <h2>{driver.surname}</h2>
          <p>nacionalidad: {driver.nationality}</p>
          <p>fecha de nacimiento: {driver.dob}</p>
          <p>Equipo: {driver.teams}</p>
          <p>Descripcion:{driver.description}</p>
          </div>
          <div className={style.detailimage}>

          <img src={driver.image.url? driver.image.url :"../../../public/f1-3d-race-car-icon-600nw-2326033695.webp"} alt={driver.name} />
          </div>

    </div>
      </div>
      </div>

  );
};

export default Detail;
