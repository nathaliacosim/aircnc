import React, { useState, useMemo } from 'react';
import { toast } from "react-toastify";
import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({ history }) {
  const [spot, setSpot] = useState({
    thumbnail: "",
    company: "",
    price: "",
    techs: ""
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post(`/spots`, spot);
      history.push("/dashboard");
    } catch (err) {
      toast.error("Erro ao cadastrar produto!");
    }
  }

  function handleInputChange(e) {
    const { id, value } = e.target;
    setSpot({
      ...spot,
      [id]: value
    });
  }

  const preview = useMemo(
    () => {
      return spot.thumbnail ? URL.createObjectURL(spot.thumbnail) : null;
    },
    [spot.thumbnail]
  );

  return (
    <form onSubmit={handleSubmit}>
      <label 
        id="thumbnail" 
        style={{ backgroundImage: `url(${preview})` }}
        className={spot.thumbnail ? 'has-thumbnail' : ''}  
      >
        <input type="file" value={spot.thumbnail} onChange={handleInputChange}/>
        <img src={camera} alt="Select img"/>
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input 
        id="company"
        placeholder="Sua empresa incrível"
        value={spot.company}
        onChange={handleInputChange}
      />

      <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
      <input 
        id="techs"
        placeholder="Quais tecnologias usam?"
        value={spot.techs}
        onChange={handleInputChange}
      />

      <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
      <input 
        id="price"
        placeholder="Valor cobrado por dia"
        value={spot.price}
        onChange={handleInputChange}
      />

      <button className="btn" type="submit">Salvar</button>
    </form>
  );
}