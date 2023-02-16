import {
    GET_ORDER_ID_REQUEST,
    GET_ORDER_ID_SUCCESS,
    GET_ORDER_ID_ERROR,
  } from "../actions/orderNumber";
  
  const initialState = {
    orderId: null,
    orderIdRequest: false,
    orderIdError: false,
  };
  
  export const orderNumberReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ORDER_ID_REQUEST: {
        return { 
          ...state, 
          orderIdRequest: true 
        };
      }
      case GET_ORDER_ID_SUCCESS: {
        return {
          ...state,
          orderIdRequest: false,
          orderIdError: false,
          orderId: action.orderId,
        };
      }
      case GET_ORDER_ID_ERROR: {
        return {
          ...state,
          orderId: null,
          orderIdRequest: false,
          orderIdError: true,
        };
      }
      default: {
        return state;
      }
    }
  };