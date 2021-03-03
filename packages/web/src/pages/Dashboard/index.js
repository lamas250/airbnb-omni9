import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';


const Dashboard = () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots(){
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: {user_id}
      });
      response.data.map(spot => {
        return spot['thumbnail_url'] = spot['thumbnail_url'].replace(' ','%20');
      })
      setSpots(response.data);
      console.log(response.data);
    }
    loadSpots();
  },[])

  return (
    <>
      <ul className="spotList">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$ ${spot.price}` : 'Free'}</span>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  )
}

export default Dashboard
