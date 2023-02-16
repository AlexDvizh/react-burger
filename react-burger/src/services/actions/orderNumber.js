import { postOrderRequest } from "../../utils/api";

export const GET_ORDER_ID_REQUEST = "GET_ORDER_ID_REQUEST";
export const GET_ORDER_ID_SUCCESS = "GET_ORDER_ID_SUCCESS";
export const GET_ORDER_ID_ERROR = "GET_ORDER_ID_ERROR";

export const setOrderId = (ingredientsId) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_ID_REQUEST,
    });
    postOrderRequest(ingredientsId)
      .then((responce) => {
        dispatch({
          type: GET_ORDER_ID_SUCCESS,
          orderId: responce.order.number,
        });
      })
      .catch((e) => {
        dispatch({ 
            type: GET_ORDER_ID_ERROR, 
            message: e.message 
        });
      });
  };
}