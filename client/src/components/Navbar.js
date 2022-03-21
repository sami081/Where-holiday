import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext)
  return (
    <header>
      
        <div className="logo">
          <NavLink exact to="/">
            <img src="./img/icon.png" alt="icone" />
          </NavLink>
          <h1>Nom du site</h1>
        </div>
        {uid ? (
          <ul>
            <li className="welcome">
              <NavLink exact to ="/profil" >
                <p>Bienvenue 'valeur dynamique'</p>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li >
              <NavLink exact to='/profil'>
                <img src="./img/icons/login.png" alt="login" className="login" />
              </NavLink>
            </li>
          </ul>
        )}
      
    </header>
  );
};

export default Navbar;
