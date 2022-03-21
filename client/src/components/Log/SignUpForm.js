import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo-error");
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-errors");
    const controlPasswordError = document.querySelector(
      ".control-password-error"
    );
    const termsError = document.querySelector(".terms-error");
    controlPasswordError.innerHTML = "";
    termsError.innerHTML = "";

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        controlPasswordError.innerHTML =
          "les mots de passe ne sont pas identiques";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <p className="succes">
            {" "}
            Inscription réussi, veuillez vous connecter{" "}
          </p>
        </>
      ) : (
        <form
          action=""
          onSubmit={handleRegister}
          id="sign-up-form"
          className="form size-form2"
        >
          <label htmlFor="pseudo"> Pseudo :</label>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <p className="pseudo-error"></p>
          <label htmlFor="email"> Email :</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <p className="email-error"></p>
          <label htmlFor="password"> Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <p className="password-errors"></p>
          <label htmlFor="controlPassword"> Confirmer le mot de passe :</label>
          <input
            type="password"
            name="controlPassword"
            id="controlPassword"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <p className="control-password-error"></p>
          <div className="checkbox">
            <label htmlFor="terms">
              J'accepte les{" "}
              <a href="/" target="blank" rel="noopener noreferrer">
                conditions générales
              </a>{" "}
            </label>
            <input type="checkbox" id="terms" />
          </div>
          <p className="terms-error"></p>
          <input
            type="submit"
            value="Valider inscription"
            className="validation"
          />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
