import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/userActions";

const UpadteProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };
  return (
    <section className="profil">
      <h1> Profil de {userData.pseudo}</h1>
      <div className="profil-box">
        <img src="./img/computer.png" alt="logo" className="img-profil" />
        <h2>bio</h2>
        {updateForm === false && (
          <>
            <p className="bio" onClick={() => setUpdateForm(!updateForm)}>
              {userData.bio}
            </p>
            <button onClick={() => setUpdateForm(!updateForm)}>
              Modifier bio
            </button>
          </>
        )}
        {updateForm && (
          <>
            <textarea
              className="bio"
              type="text"
              defaultValue={userData.bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
            <button onClick={handleUpdate}>Valider</button>
          </>
        )}
      </div>
    </section>
  );
};

export default UpadteProfil;
