import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals=(e) => {
    if(e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if(e.target.id ==="login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  }

  return (
    <div className='form-container'>
    <ul className='identification'>
      <li onClick={handleModals} className={signUpModal ? 'button-inscription': null}  id='register'>s'inscrire</li>
      <li  onClick={handleModals} className={signInModal ? 'button-inscription': null}id='login'>se connecter</li>
    </ul>
    {signUpModal && <SignUpForm />}
    {signInModal && <SignInForm />}
    </div>
  );
};

export default Log;