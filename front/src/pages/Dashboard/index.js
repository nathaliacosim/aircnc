import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/spots', spots);
      console.log(response)
      setSpots(response.data.docs);
    }
    loadSpots()
  }, []);

  console.log(spots)
  return (
    <>
      <ul className="spot-list">
        {spots && spots.map(spot => (
          <li key={spot._id}>
            <strong>{spot.company}</strong>
            <h4>{spot.techs}</h4>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO' }</span>
          </li>
        ))}
      </ul>
      <Link to="/new" >
        <button className="btn">Cadastrar novo Spot</button>
      </Link>
    </>
  );
}