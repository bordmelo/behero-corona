import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      whatsapp,
      city,
      state
    };

    try {
      const response = await api.post('needers', data)

      alert(`Seu ID de acesso: ${response.data.id}`);

      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem casos de 
          ajuda na quarentena pelo Corona Vírus</p>

          <Link className="link" to="/">
            <FiArrowLeft size={16} color="#00B495" />
            Voltar para o login
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome" 
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input  
            placeholder="Whatsapp" 
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="Cidade" 
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input 
              placeholder="UF"
              style={{ width: 80 }} 
              value={state}
              onChange={e => setState(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}