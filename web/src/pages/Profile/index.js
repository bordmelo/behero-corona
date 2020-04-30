import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';
import './styles.css';

export default function () {
  const [incidents, setIncidents] = useState([]);

  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: userId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [userId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: userId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.')
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vindo, {userName}</span>

        <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
        <button type="Button" onClick={handleLogout}>
          <FiPower size={18} color="#00B495" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>CATEGORIA:</strong>
            <p>{incident.category}</p>
          
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}