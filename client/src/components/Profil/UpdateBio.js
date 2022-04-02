import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/userActions";

const UpdateBio = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };
  return (
   
      
      <div className="profil-box">
        
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

  );
};

export default UpdateBio;