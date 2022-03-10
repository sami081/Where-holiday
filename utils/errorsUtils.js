module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

    if(err.code ===11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
    errors.pseudo = 'ce pseudo est deja pris'

    if(err.code ===11000 && Object.keys(err.keyValue)[0].includes('email'))
    errors.email= 'cet email est deja enregistré'

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email :'', password: ''}

  if(err.message.includes("email")) errors.email ="Email inconnu"

  if(err.message.includes("password")) errors.password ="Mot de passe inconnu"

  return errors
}
