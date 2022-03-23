import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfilNavbar = () => {
  return (
    <div className='nav-profil'>
      <NavLink to ='/' >
        <img src='./img/icons/home.jpg' alt='home' />
      </NavLink>
      <NavLink to ='/trending' >
        <img src='./img/icons/sandale.jpg' alt='sandale' />
      </NavLink>
      <NavLink to ='/profil'>
        <img src='./img/icons/profil.png' alt='profil' />
      </NavLink>
      
    </div>
  );
};

export default ProfilNavbar;