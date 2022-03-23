import React, {useContext} from "react";
import Log from "../components/Log/index";
import {UidContext} from "../components/AppContext"
import UpadteProfil from "../components/Profil/UpadteProfil";
const Profil = () => {
  const uid = useContext(UidContext)
  return (
  
    
    <section className="profil-page">
     {uid ? (
    < UpadteProfil />
     ) : (
       
     
      <div className="form-div">
      <Log signin={false} signup={true} />
     
      </div>
     )}
      <img src="./img/logo-inscription.jpg" alt="ordinateur" />
    </section>
  );
};

export default Profil;
