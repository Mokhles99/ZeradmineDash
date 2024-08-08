import axios from 'axios';
import { userConstants } from './constantes';
// Action to fetch all users
export const fetchAllUsers = () => async (dispatch) => {
    dispatch({ type: userConstants.FETCH_USERS_REQUEST });
    try {
        const response = await axios.get('http://5.196.6.177:8082/api/users');
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
        const response = await axios.post('http://5.196.6.177:8082/api/user/change-role-by-id', { userId, roleId });
        dispatch({ type: userConstants.CHANGE_USER_ROLE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: userConstants.CHANGE_USER_ROLE_FAILURE, payload: error.response.data.message });
    }
};
