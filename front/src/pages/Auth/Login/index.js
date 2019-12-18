import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import api from '../../../services/api';
import { login } from "../../../services/auth";

export default function Login({ history }) {
  const [loading, setLoading] = useState("disabled");
  const [user, setUser] = useState({ email: "", password: "" });

  useEffect(() => {
    const isEnabled = () => {
      return user.email.length > 5 && user.password.length >= 6
        ? setLoading("")
        : setLoading("disabled");
    };
    isEnabled();
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post(`/sessions`, user);

      const { token, user: userData } = response.data;

      if (token) {
        login(token, userData);
      }

      history.push("/index");
    } catch (err) {
      toast.error("Email ou senha inválido!");
    }
  }

  function handleInputChange(e) {
    const { id, value } = e.target;
    setUser({
      ...user,
      [id]: value
    });
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL * </label>
        <input 
          id="email" 
          type="text"
          value={user.email} 
          placeholder="Seu e-mail"
          onChange={handleInputChange}
        />

        <label htmlFor="password">SENHA * </label>
        <input 
          id="password" 
          type="password"
          value={user.password} 
          placeholder="Senha"
          onChange={handleInputChange}
        />

        <button className="btn" type="submit">Entrar</button>
      </form>
    </>
  );
}