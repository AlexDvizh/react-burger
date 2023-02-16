import {
    AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_ERROR,
    AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR,
    AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_ERROR,
} from "../actions/authentication";
  
const initialState = {
    isLoggedIn: false,
    registerRequest: false,
    registerError: false,
    loginRequest: false,
    loginError: false,
    logoutRequest: false,
    logoutError: false,
};
  
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REGISTER_REQUEST: {
            return {
            ...state,
            registerRequest: true,
            };
        }
        case AUTH_REGISTER_SUCCESS: {
            return {
            ...state,
            registerRequest: false,
            registerError: false,
            };
        }
        case AUTH_REGISTER_ERROR: {
            return {
            ...state,
            registerRequest: false,
            registerError: true,
            isLoggedIn: false,
            };
        }
        case AUTH_LOGIN_REQUEST: {
            return {
            ...state,
            loginRequest: true,
            };
        }
        case AUTH_LOGIN_SUCCESS: {
            const { user } = action;

            return {
            ...state,
            loginRequest: false,
            loginError: false,
            isLoggedIn: true,
            user: { ...state.user, username: user.name, email: user.email },
            };
        }
        case AUTH_LOGIN_ERROR: {
            return {
            ...state,
            loginRequest: false,
            loginError: true,
            isLoggedIn: false,
            };
        }
        case AUTH_LOGOUT_REQUEST: {
            return {
            ...state,
            logoutRequest: true,
            };
        }
        case AUTH_LOGOUT_SUCCESS: {
            return {
            ...state,
            logoutRequest: false,
            logoutError: false,
            isLoggedIn: false,
            };
        }
        case AUTH_LOGOUT_ERROR: {
            return {
            ...state,
            logoutRequest: false,
            logoutError: true,
            isLoggedIn: true,
            };
        }
        default: {
            return state;
        }
    }
};