import React from "react";
import {  useSelector } from "react-redux";
import UpdateBio from "./UpdateBio";
import UpdateEmail from "./UpdateEmail";
import UpdatePicture from "./UpdatePicture"


const UpadteProfil = () => {
  
  // const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  // const dispatch = useDispatch();

  
  return (
    <section className="profil">
      <h1> Profil de {userData.pseudo}</h1>
      <UpdatePicture />
      <UpdateBio />
      <UpdateEmail />
      {/* <div className="profil-box">
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
        <h2>Email</h2>
        {updateForm === false && (
          <>
            <p className="email" onClick={() => setUpdateForm(!updateForm)}>
              {userData.email}
            </p>
            <button onClick={() => setUpdateForm(!updateForm)}>
              Modifier Email
            </button>
          </>
        )}
        {updateForm && (
          <>
            <textarea
              className="email"
              type="email"
              defaultValue={userData.email}
              onChange={(e) => setEmail(e.target.value)}>
            </textarea>
            <button onClick={handleUpdate}>Valider</button>
          </>
        )}
      </div> */}
    </section>
  );
};

export default UpadteProfil;