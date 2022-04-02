import { GET_USER, UPDATE_BIO, UPDATE_Email, UPLOAD_PICTURE } from "../actions/userActions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
      case UPLOAD_PICTURE :
        return {
          ...state,
          picture : action.payload,
        }
    case UPDATE_BIO:
      return {
         ...state,
        bio: action.payload,
      };
      case UPDATE_Email:
        return {
          ...state,
          email: action.payload
        };
    default:
      return state;
  }
}