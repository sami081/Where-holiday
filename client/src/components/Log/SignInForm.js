import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form" className="form size-form">
      <label htmlFor="email">Email :</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <p className="email-error"></p>
      <label htmlFor="password">Mot de passe :</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <p className="password-error"></p>
      <input type="submit" value="se connecter" className="button" />
    </form>
  );
};

export default SignInForm;
