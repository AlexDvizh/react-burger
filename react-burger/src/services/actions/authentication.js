import {
    registerRequest, loginRequest, logoutRequest, getUserRequest,
} from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/cookie";
  
export const AUTH_REGISTER_REQUEST = "AUTH/REGISTER_REQUEST";
export const AUTH_REGISTER_SUCCESS = "AUTH/REGISTER_SUCCESS";
export const AUTH_REGISTER_ERROR = "AUTH/REGISTER_FAILED";

export const AUTH_LOGIN_REQUEST = "AUTH/LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS = "AUTH/LOGIN_SUCCESS";
export const AUTH_LOGIN_ERROR = "AUTH/LOGIN_FAILED";

export const AUTH_LOGOUT_REQUEST = "AUTH/LOGOUT_REQUEST";
export const AUTH_LOGOUT_SUCCESS = "AUTH/LOGOUT_SUCCESS";
export const AUTH_LOGOUT_ERROR= "AUTH/LOGOUT_FAILED";

export const AUTH_GET_USER_REQUEST = "AUTH/GET_USER_REQUEST";
export const AUTH_GET_USER_SUCCESS = "AUTH/GET_USER_SUCCESS";
export const AUTH_GET_USER_ERROR = "AUTH/GET_USER_FAILED";

  
export function register(form) {
    return function (dispatch) {
      dispatch({ type: AUTH_REGISTER_REQUEST });

      registerRequest(form)
        .then(() => {
          dispatch({ type: AUTH_REGISTER_SUCCESS });
        })
        .catch(() => {
          dispatch({ type: AUTH_REGISTER_ERROR });
        });
    };
}
  
export function login(form) {
    return function (dispatch) {
      dispatch({ type: AUTH_LOGIN_REQUEST });

      loginRequest(form)
        .then((data) => {
          dispatch({
            type: AUTH_LOGIN_SUCCESS,
            ...data,
          });
          return data;
        })
        .then((data) => {
          setCookie(data.accessToken);
          window.localStorage.setItem("refreshToken", data.refreshToken);
        })
        .catch(() => {
          dispatch({ type: AUTH_LOGIN_ERROR });
        });
    };
}
  
export function logout(token) {
    return function (dispatch) {
      dispatch({ type: AUTH_LOGOUT_REQUEST });

      logoutRequest(token)
        .then(() => {
          dispatch({ type: AUTH_LOGOUT_SUCCESS });
        })
        .then(() => {
          deleteCookie("accessToken");
          window.localStorage.clear();
        })
        .catch(() => {
          dispatch({ type: AUTH_LOGOUT_ERROR });
        });
    };
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: AUTH_GET_USER_REQUEST,
    });
    getUserRequest()
      .then((res) => {
        dispatch({
          type: AUTH_GET_USER_SUCCESS,
          ...res,
        });
      })
      .catch(() => {
        dispatch({
          type: AUTH_GET_USER_ERROR,
        });
      });
  };
}