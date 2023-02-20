import { getCookie } from './cookie';
import { URL } from './utils';

const requestApi = (url, options) => {
    return fetch(url, options).then(checkResponce);
}

const checkResponce = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredientsRequest = async () => {
    return await requestApi(`${URL}/ingredients`);
  };
  
export const postOrderRequest = async (ingredientsId) => {
    return await requestApi(`${URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredientsId }),
    });
}

export const registerRequest = async (form) => {
    const { email, password, name } = form;
    return await requestApi(`${URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password, name: name }),
    });
};

export const loginRequest = async (form) => {
    const { email, password } = form;
    return await requestApi(`${URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: getCookie("accessToken"),
        },
        body: JSON.stringify({ email: email, password: password }),
    });
};

export const logoutRequest = async (token) => {
    return await requestApi(`${URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    });
};

export const getUserRequest = async () => {
    return await requestApi(`${URL}/auth/user`, {
        headers: { Authorization: getCookie("accessToken") },
    });
};

export const updateTokenRequest = async (refreshToken) => {
    return await requestApi(`${URL}/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: refreshToken }),
    });
};

export const updateUserRequest = async (form) => {
    const { name, email } = form;
    return await requestApi(`${URL}/auth/user`, {
        method: "PATCH",
        headers: { Authorization: getCookie("accessToken") },
        body: JSON.stringify({ name: name, email: email }),
    });
};

export const resetPasswordRequest = async (email) => {
    return await requestApi(`${URL}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  };
  
export const resetPasswordConfirm = async (form) => {
    const { password, token } = form;
    return await requestApi(`${URL}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    });
  };
  