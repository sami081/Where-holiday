import React, {useContext} from "react";
import Log from "../components/Log/index";
import {UidContext} from "../components/AppContext"
const Profil = () => {
  const uid = useContext(UidContext)
  return (
  
    
    <section className="profil-page">
     {uid ? (
       <h1>UPDATE PAGE</h1>
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
