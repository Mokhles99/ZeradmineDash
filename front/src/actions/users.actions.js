import axios from 'axios';
import { userConstants } from './constantes';

import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
  } from "./types";
// Action to fetch all users
export const fetchAllUsers = () => async (dispatch) => {
    dispatch({ type: userConstants.FETCH_USERS_REQUEST });
    try {
        const response = await axios.get('https://admin.szq.tn/api/users');
        console.log("Fetched Users:", response.data);  // Log fetched users to the console
        dispatch({ type: userConstants.FETCH_USERS_SUCCESS, payload: response.data });
    } catch (error) {
        console.log("Error fetching users:", error.response?.data?.message);  // Log errors if any
        dispatch({ type: userConstants.FETCH_USERS_FAILURE, payload: error.response?.data?.message });
    }
};

// Action to change a user's role
export const changeUserRole = (userId, roleId) => async (dispatch) => {
    dispatch({ type: userConstants.CHANGE_USER_ROLE_REQUEST });
    try {
        const response = await axios.post('https://admin.szq.tn/api/user/change-role-by-id', { userId, roleId });
        dispatch({ type: userConstants.CHANGE_USER_ROLE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: userConstants.CHANGE_USER_ROLE_FAILURE, payload: error.response.data.message });
    }
};

 
  
  // Forgot Password Action
  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post("https://admin.szq.tn/api/auth/forgot-password", { email }, config);
  
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
  
  // Reset Password Action
  export const resetPassword = (token, password) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(`https://admin.szq.tn/api/auth/reset-password/${token}`, { password }, config);
  
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
