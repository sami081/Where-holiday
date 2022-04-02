import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEmail } from "../../actions/userActions";

const UpdateEmail = () => {
  const [email, setEmail] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {

e.preventDefault();
    dispatch(updateEmail(userData._id, email));
    setUpdateForm(false);
  };
  return (
    <div className="profil-box">
      <h2>email</h2>
      {updateForm === false && (
        <>
          <p className="email" onClick={() => setUpdateForm(!updateForm)}>
            {userData.email}
          </p>
          <button onClick={() => setUpdateForm(!updateForm)}>
            Modifier email
          </button>
        </>
      )}
      {updateForm && (
        <>
          <form  className="form-email"action="" onSubmit={handleUpdate} id="put-form">
            <label htmlFor="email"></label>
            <input
            type="email"
            name="email"
            id="email"
            className="email"
            onChange={(e) =>{ 
              setEmail(e.target.value)
            }}
            value={email}
           isValid
          />
           <input
            type="submit"
            value="Valider"
            className="email"
          />
          </form>

        </>
      )}
    </div>
  );
};

export default UpdateEmail;
