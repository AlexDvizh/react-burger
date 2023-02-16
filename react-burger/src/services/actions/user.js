import {
    updateTokenRequest, getUserRequest, updateUserRequest,
  } from "../../utils/api";
  import { setCookie } from "../../utils/cookie";
  
  export const SET_USER_REQUEST = "SET_USER_REQUEST";
  export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
  export const SET_USER_ERROR = "SET_USER_FAILED";
  
  export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
  export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
  export const UPDATE_USER_ERROR = "UPDATE_USER_FAILED";
  
 export const setUser = (accessToken, refreshToken) => {
    return async function (dispatch) {
      dispatch({ type: SET_USER_REQUEST });

      if (!accessToken) {
        await updateTokenRequest(refreshToken).then((res) => {
          setCookie(res.accessToken);
          window.localStorage.setItem("refreshToken", res.refreshToken);
        });
      }

      if (accessToken || refreshToken) {
        await getUserRequest()
          .then((res) => {
            dispatch({
              type: SET_USER_SUCCESS,
              ...res,
            });
          })
          .catch(() => {
            dispatch({ type: SET_USER_ERROR });
          });
      }
    };
  }
  
export const updateUser = (form) => {
    return function (dispatch) {
        dispatch({ type: UPDATE_USER_REQUEST });

        updateUserRequest(form)
        .then((res) => {
            dispatch({ 
                type: UPDATE_USER_SUCCESS, 
                ...res 
            });
        })
        .catch(() => {
            dispatch({ type: UPDATE_USER_ERROR });
        });
    };
}