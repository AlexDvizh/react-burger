import {
    AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_ERROR,
    AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR,
    AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_ERROR, AUTH_GET_USER_REQUEST, AUTH_GET_USER_ERROR, AUTH_GET_USER_SUCCESS,
} from "../actions/authentication";
  
const initialState = {
    isLoggedIn: false,
    user: {},

    registerRequest: false,
    registerError: false,

    loginRequest: false,
    loginError: false,

    logoutRequest: false,
    logoutError: false,

    getUserRequest: false,
    getUserError: false,
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
            const { user } = action;

            return {
            ...state,
            user: { ...state.user, username: user.name, email: user.email },
            registerRequest: false,
            registerError: false,
            isLoggedIn: true,
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
        case AUTH_GET_USER_REQUEST: {
            return {
              ...state,
              getUserRequest: true,
            };
        }
        case AUTH_GET_USER_SUCCESS: {
            const { user } = action;

            return {
              ...state,
              user: { ...state.user, username: user.name, email: user.email },
              getUserRequest: false,
              getUserFailed: false,
              isLoggedIn: true,
            };
        }
        case AUTH_GET_USER_ERROR: {
            return {
              ...state,
              getUserRequest: false,
              getUserFailed: false,
              isLoggedIn: false,
            };
        }
        default: {
            return state;
        }
    }
};