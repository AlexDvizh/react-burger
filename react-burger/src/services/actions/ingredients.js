import { getIngredientsRequest } from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_ERROR = "GET_INGREDIENTS_ERROR";
export const INGREDIENTS_COUNTER_INCREASE = "INGREDIENTS_COUNTER_INCREASE";
export const INGREDIENTS_COUNTER_DECREASE = "INGREDIENTS_COUNTER_DECREASE";
export const CHANGE_BUN = "CHANGE_BUN";

export const getIngredients = () => {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        getIngredientsRequest()
            .then((response) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: response.data
                })
            })
            .catch((err) => {
                dispatch({
                    type: GET_INGREDIENTS_ERROR,
                    errorMessage: err.message
                })
            });
    }
}