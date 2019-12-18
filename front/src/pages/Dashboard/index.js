import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

let data = [];

export default function Dashboard({ history }) {
  const loadAds = setTimeout(async function() {
    const response = await api.get("/spots");
    data = response.data.docs;
    console.log(data);
  }, 1000);
  
  return (
    <>
      <div>
        {data.map(function(object) {
              return (
                <ul className="spot-list" key={object._id}>
                  <p>Local: {object.company}</p>
                  <p>Preço: {object.price}</p>
                  <p>Tecnologias: R$ {object.techs}</p>
                </ul>
              );
        })}
      </div>
    </>
  );
}