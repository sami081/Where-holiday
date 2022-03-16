import React, { useState } from "react";
import axios from "axios";
import { Axios } from "axios";

const SignUpForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo-error");
    const emailError = document.getElementById(".email-error");
    const passwordError = document.querySelector(".password-error");
    const passwordConfirmError = document.querySelector(".password-confirm-error" );
    const termsError = document.querySelector(".terms-error");

passwordConfirmError.innerHTML="";
termsError.innerHTML="";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "les mots de passe ne sont pas identiques !";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez accepter les conditions générales.";
    }else{
      
    }
  };

  return (
    <form action="" onSubmit={handleRegister} id="sign-up-form">
      <label htmlFor="pseudo">Pseudo</label>
      <br />
      <input
        type="text"
        name="pseudo"
        id="pseudo"
        onChange={(e) => setPseudo(e.target.value)}
        value={pseudo}
      />
      <br />
      <div className="pseudo-error"></div>
      <br />
      <label htmlFor="email">Email</label>
      <br />

      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <div className="email-error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />

      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <div className="password-error"></div>
      <br />
      <label htmlFor="password-conf">Confirmation du Mot de passe</label>
      <br />

      <input
        type="password"
        name="password-conf"
        id="password-conf"
        onChange={(e) => setControlPassword(e.target.value)}
        value={controlPassword}
      />
      <br />
      <div className="password-confirm-error"></div>
      <br />
      <input type="checkbox" id="terms" />
      <label htmlFor="terms">
        J'accepte les{" "}
        <a href="/" target="_blank" rel="noopener noreferrer">
          conditions générales
        </a>
      </label>
      <div className="terms-error"></div>
      <br />
      <input type="submit" value="Valider l'inscription" />
    </form>
  );
};

export default SignUpForm;
