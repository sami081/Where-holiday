import React, { useContext } from 'react';
import SignInForm from '../components/Log/SignInForm';
import { UidContext } from '../components/AppContext';
const Home = () => {
  const uid = useContext(UidContext);
  return (
  <div>
{uid ? (
"POST"
) : (
  <SignInForm />
)}
  </div>
   
  );
};

export default Home;