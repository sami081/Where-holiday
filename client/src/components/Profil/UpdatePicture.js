import React from 'react';
import { useSelector } from 'react-redux';
import UploadImg from './UploadImg';

const UpdatePicture = () => {
  const userData = useSelector((state) => state.userReducer);
  return (
    <div>
      <h2>Photo de profil</h2>
      <img src = {userData.picture} alt="user-pic" />
      <UploadImg />

    </div>
  );
};

export default UpdatePicture;