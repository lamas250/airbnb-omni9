import React, { useState } from 'react'
import api from '../../services/api';

const Login = ({history}) => {
  const [email, setEmail] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    
    const response = await api.post('/session',{
      email: email
    })

    const { _id } = response.data;

    localStorage.setItem('user', _id);
    history.push('/dashboard');
  }

  return (
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre 
        <strong>talentos</strong> para sua empresa.
      </p>
      <form onSubmit={handleSubmit}>
          <label>Email*</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Seu melhor email aqui"
            onChange={e => (setEmail(e.target.value))}
          />
          <button className="btn" type="submit">Entrar</button>
        </form>
    </>
  )
}

export default Login
