import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import ProfilNavbar from "./ProfilNavbar";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <header>
      <NavLink exact to="/">
        <img src="./img/icon.png" alt="icon" />
      </NavLink>

      {uid ? (
        <NavLink exact to="/profil" className="nav-profil">
          <p className="pseudo">{userData.pseudo}</p>
          <div>
          <ProfilNavbar />
          </div>
          <Logout />
        </NavLink>
      ) : (
        <NavLink exact to="/profil">
          <img
            src="./img/icons/icon-connexion.jpg"
            alt="icon-dec"
            className="icon-connexion"
          />
        </NavLink>
      )}
    </header>
  );
};

export default Navbar;
