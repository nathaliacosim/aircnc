import React, { useState } from "react";
import { toast } from "react-toastify";

import api from '../../../services/api';
import { login } from "../../../services/auth";

export default function Login({ history }) {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post(`/users`, user);

      const userCreate = { email: user.email, password: user.password };

      const response = await api.post(`/sessions`, userCreate);

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
        <label htmlFor="nome">NOME * </label>
        <input 
          id="nome" 
          type="text"
          value={user.name} 
          placeholder="Como gostaria de ser chamado?"
          onChange={handleInputChange}
        />

        <label htmlFor="email">E-MAIL * </label>
        <input 
          id="email" 
          type="text"
          value={user.email} 
          placeholder="Seu melhor e-mail"
          onChange={handleInputChange}
        />

        <label htmlFor="senha">SENHA * </label>
        <input 
          id="senha" 
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