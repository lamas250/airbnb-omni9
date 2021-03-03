import React, { useState } from 'react'

const New = () => {
  const [form, setForm] = useState({company: '',})

  function handleSubmit(){

  }

  function handleForm(e){
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Empresa*</label>
      <input 
        name={"company"}
        placeholder="Sua empresa aqui"
        value={form.company}
        onChange={handleForm}
      />
      <label>Tecnologias* <span>Separado por virgulas</span></label>
      <input 
        name={"company"}
        placeholder="Sua empresa aqui"
        value={form.company}
        onChange={handleForm}
      />
    </form>
  )
}

export default New
