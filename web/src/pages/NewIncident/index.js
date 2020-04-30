import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const userId = localStorage.getItem('userId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      category,
      value
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: userId
        }
      });

      history.push('/profile');
    } catch (err) {
      alert('Erro ao criar caso, tente novamente.');
    }
    
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="link" to="/profile">
            <FiArrowLeft size={16} color="#00B495" />
            Voltar para a home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            placeholder="Categoria"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <input 
            placeholder="Valor em Reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}