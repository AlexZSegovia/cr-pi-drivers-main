import React from 'react';
import Card from '../card/Card'; 
import './Cards.css';

const Cards = ({ drivers }) => {
  console.log(drivers); // Ver los datos recibidos antes de renderizar

  return (
    <div className="container">
      {drivers.map(driver => (
        <Card
          key={driver.id}
          forename={driver.name ? (driver.name.forename ? driver.name.forename : driver.forename) : driver.forename} // Verifica si driver.name existe
          surname={driver.name ? (driver.name.surname ? driver.name.surname : driver.surname) : driver.surname} // Verifica si driver.name existe
          image={driver.image ? driver.image.url : "../../../public/f1-3d-race-car-icon-600nw-2326033695.webp"} // Verifica si driver.image existe
          id={driver.id}
          description={driver.description}
          nationality={driver.nationality}
          dob={driver.dob}
          teams={driver.teams}
        />
      ))}
    </div>
  );
};

export default Cards;
