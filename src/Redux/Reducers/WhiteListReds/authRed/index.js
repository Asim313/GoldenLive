import {ACTION_TYPES} from '../../../ActionTypes';

const initialState = {
  userToken: null,
  userData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOGIN_DATA:
      // console.log("in ============<<<<<<<<<<<<<<<<<<<<<<<<<<<< ", action.data)
      return {
        ...state,
        userToken: action.data.token,
        userData: action.data,
      };

    case ACTION_TYPES.LOGOUT:
     // console.log("in ============<<<<<<<<<<<<<<<<<<<<<<<<<<<< 222222222 ", action.data)
      return {
        ...state,
        userToken: null,
        userData: null,
      };

    default:
      return state;
  }
};

export default authReducer;
