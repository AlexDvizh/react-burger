import { getCookie, setCookie } from './cookie';
import { URL } from './utils';

import {
    IResponse, ILogin, IRegister,
    IResetPassword, IUpdateuser, IRefreshData,
    IOptions, IRefreshOptions, IUser,
  } from "./types/api-types";
import { TIngredient } from './types/ingredients-types';

function requestApi<T>(url: string, options?: IOptions): Promise<T> {
    return fetch(url, options).then(checkResponce);
}

const checkResponce = <T>(res: IResponse<T>): Promise<T> => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
};

export const requestWithRefresh = async <T>(
    url: string,
    options: IRefreshOptions
  ): Promise<T> => {
    try {
      return await requestApi(url, options);
    } catch (err) {
      if ((err as any).message === "jwt expired" || "You should be authorised") {
        const refreshData: IRefreshData = await updateTokenRequest();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken as string);
        setCookie(refreshData.accessToken as string);
        options.headers["Authorization"] = refreshData.accessToken as string;
        return await requestApi(url, options);
      } else if ((err as any).message === "Token is invalid") {
        return Promise.reject(err);
      } else {
        return Promise.reject(err);
      }
    }
};

export const getIngredientsRequest = async () => {
    return await requestApi<TIngredient[]>(`${URL}/ingredients`);
  };
  
export const postOrderRequest = async (ingredientsId: Array<string>) => {
    return await requestApi(`${URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredientsId }),
    });
}

export const registerRequest = async (form: IRegister) => {
    const { email, password, name } = form;
    return await requestApi<IRegister>(`${URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password, name: name }),
    });
};

export const loginRequest = async (form: ILogin) => {
    const { email, password } = form;
    return await requestApi<ILogin>(`${URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: getCookie("accessToken"),
        },
        body: JSON.stringify({ email: email, password: password }),
    });
};

export const logoutRequest = async () => {
    return await requestApi(`${URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    });
};

export const getUserRequest = async () => {
    return await requestWithRefresh<IUser>(`${URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
  });
};

export const updateTokenRequest = async (): Promise<IRefreshData> => {
    return await requestApi(`${URL}/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    });
};

export const updateUserRequest = async (form: IUpdateuser) => {
    const inputs: IUpdateuser = { ...form };
    if (!inputs.password) {
        delete inputs.password;
    }
    return await requestWithRefresh(`${URL}/auth/user`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("accessToken"),
        },
        body: JSON.stringify({ ...inputs }),
  });
};

export const resetPasswordRequest = async <T>(email: string): Promise<T> => {
    return await requestApi(`${URL}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  };
  
export const resetPasswordConfirm = async (form: IResetPassword) => {
    const { password, token } = form;
    return await requestApi(`${URL}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    });
  };
  