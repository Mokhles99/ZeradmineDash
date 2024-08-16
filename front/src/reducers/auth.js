// import {
//   REGISTER_SUCCESS,
//   REGISTER_FAIL,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT,
// } from "../actions/types";

// const user = JSON.parse(localStorage.getItem("user"));

// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };

// export default function (state = initialState, action) {
//   const { type, payload } = action;

//   switch (type) {
//     case REGISTER_SUCCESS:
//       return {
//         ...state,
//         isLoggedIn: false,
//       };
//     case REGISTER_FAIL:
//       return {
//         ...state,
//         isLoggedIn: false,
//       };
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         isLoggedIn: true,
//         user: payload.user,
//       };
//     case LOGIN_FAIL:
//       return {
//         ...state,
//         isLoggedIn: false,
//         user: null,
//       };
//     case LOGOUT:
//       return {
//         ...state,
//         isLoggedIn: false,
//         user: null,
//       };
//     default:
//       return state;
//   }
// }


import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user, loading: false, message: null, error: null }
  : { isLoggedIn: false, user: null, loading: false, message: null, error: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        message: null,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        error: null,
      };
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        message: null,
        error: payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        error: null,
      };
    default:
      return state;
  }
}
