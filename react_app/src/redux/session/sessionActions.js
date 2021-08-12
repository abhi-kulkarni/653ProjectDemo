import {
  SIGN_IN,
  SIGN_OUT,
  CLEAR_SESSION,
  USER_CREATED_SUCCESS,
  USER_DATA
} from "./sessionTypes";

export const sign_in = () => {
  return {
    type: SIGN_IN,
  };
};

export const sign_out = () => {
  return {
    type: SIGN_OUT,
  };
};

export const clear_session = () => {
  return {
    type: CLEAR_SESSION,
  };
};

export const user_created_success = () => {
  return {
    type: USER_CREATED_SUCCESS,
  };
};

export const user_data = (user_data = {}) => {
  return {
    type: USER_DATA,
    payload: user_data,
  };
};