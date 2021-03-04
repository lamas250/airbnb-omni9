import React, { useState, useMemo } from 'react';

import camera from '../../assets/camera.svg';
import api from '../../services/api';
import "./style.css";

const New = ({history}) => {
  const [form, setForm] = useState({company: '', techs: '', price: ''});
  const [thumbnail, setThumbnail] = useState('');
  
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;

  },[thumbnail]);


  async function handleSubmit(e){
    e.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', form.company);
    data.append('techs', form.techs);
    data.append('price', form.price);
    
    await api.post('/spots', data, {
      headers: {user_id}
    })
    // console.log((data, user_id));
    history.push('/dashboard');
  }

  function handleForm(e){
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label 
        id="thumbnail" 
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>
      <label>Empresa*</label>
      <input 
        name={"company"}
        placeholder="Sua empresa aqui."
        value={form.company}
        onChange={handleForm}
      />
      <label>Tecnologias* <span>(separado por virgulas)</span></label>
      <input 
        name={"techs"}
        placeholder="Quais tecnologias usam?"
        value={form.techs}
        onChange={handleForm}
      />
      <label>Valor da diaria?* <span>(em branco para gratuito)</span></label>
      <input 
        name={"price"}
        placeholder="Valor combrado por dia."
        value={form.price}
        onChange={handleForm}
      />
      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )
}

export default New
