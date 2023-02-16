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