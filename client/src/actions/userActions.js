import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_Email="UPDATE_EMAIL";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {

        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
export const uploadPicture = (data, id) => {
  console.log("1");
  return (dispatch) => {
    console.log("2");
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        console.log("3");
       
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        
      })
      .catch((err) => console.log(err));
  };
};

export const updateBio = (userId, bio) => {
  console.log('rrr');
  return (dispatch) => {
console.log('err');
    return axios({
      method: "put",
      url:`${process.env.REACT_APP_API_URL}api/user/` + userId,
      data:{ bio },
    } ,
    console.log('errrt'))
    // console.log("erryyuu")
      .then((res) => {
        console.log("res.data");
        dispatch({ type: UPDATE_BIO, payload: bio});
      })
      .catch((err) => console.log({err}));
  };
};
export const updateEmail = (userId, email) => {
  console.log('rrr');
  return (dispatch) => {
console.log('err');
    return axios({
      method: "put",
      url:`${process.env.REACT_APP_API_URL}api/user/` + userId,
      data:{ email},
    } ,
    console.log('errrt'))
    // console.log("erryyuu")
      .then((res) => {
        console.log("res.data");
        dispatch({ type: UPDATE_Email, payload: email});
      })
      .catch((err) => console.log({err}));
  };
};