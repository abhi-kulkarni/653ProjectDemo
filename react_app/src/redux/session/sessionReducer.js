import {
  SIGN_IN,
  SIGN_OUT,
  CLEAR_SESSION,
  USER_CREATED_SUCCESS,
  USER_DATA
} from "./sessionTypes";

const initialState = {
  isLoggedIn: false,
  userCreatedSuccess: false,
  userData: {}
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case SIGN_OUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    case CLEAR_SESSION:
      return {
          isLoggedIn: false,
          userCreatedSuccess: false,
      };
    case USER_CREATED_SUCCESS:
      return {
        ...state,
        userCreatedSuccess: true,
      };
    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
