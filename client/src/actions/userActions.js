import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_BIO = "UPDATE_BIO";

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
