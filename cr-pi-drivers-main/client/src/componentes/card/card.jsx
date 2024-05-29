import React from 'react';
import { Link } from "react-router-dom"; // Importa useLocation
import './Card.css'; // Importa tu archivo CSS

const Card = ({ forename ,surname, image, id, description, nationality, dob, teams }) => {
 
  return (
    <div className="card">
       <Link to={`/detail/${id}`} className="cardLink">
        <div className="cardHeader">
          <h2>{forename} {surname}</h2>
        </div>
        <div className="cardImage">
          <img src={image? image :"../../../public/f1-3d-race-car-icon-600nw-2326033695.webp"} alt={surname} />
        </div>
        <div className="escuderia">
      <h3>{teams}</h3>
      </div>
      </Link>
    </div>
  );
};

export default Card;
