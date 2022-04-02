import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/userActions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const handlepicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);
    
    dispatch(uploadPicture(data, userData._id));
  };
  return (
    <form action="" onSubmit={handlepicture} className="upload-user">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        id="file"
        name="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input type="submit" value="envoyer" />
    </form>
  );
};

export default UploadImg;
