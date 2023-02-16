import {
    SET_USER_REQUEST, SET_USER_SUCCESS, SET_USER_ERROR,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
} from "../actions/user";
  
const initialState = {
    user: { username: "", email: "" },
    isLoggedIn: false,
    setUserRequest: false,
    setUserError: false,
    updateUserRequest: false,
    updateUserError: false,
};
  
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_REQUEST: {
            return {
            ...state,
            setUserRequest: true,
            };
        }
        case SET_USER_SUCCESS: {
            const { user } = action;
            return {
            ...state,
            setUserRequest: false,
            setUserError: false,
            isLoggedIn: true,
            user: { ...state.user, username: user.name, email: user.email },
            };
        }
        case SET_USER_ERROR: {
            return {
            ...state,
            setUserRequest: false,
            setUserError: true,
            isLoggedIn: false,
            };
        }
        case UPDATE_USER_REQUEST: {
            return {
            ...state,
            updateUserRequest: true,
            };
        }
        case UPDATE_USER_SUCCESS: {
            const { user } = action;

            return {
            ...state,
            updateUserRequest: false,
            updateUserError: false,
            user: { ...state.user, username: user.name, email: user.email },
            };
        }
        case UPDATE_USER_ERROR: {
            return {
            ...state,
            updateUserRequest: false,
            updateUserError: true,
            };
        }
        default: {
            return state;
        }
    }
};