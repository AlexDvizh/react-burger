import { FILL_MODAL, CLEAR_MODAL } from "../actions/currentIngredient";

const initialState = {
  ingredient: {},
  isOpen: false,
};

const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILL_MODAL: {
      return {
        ...state,
        ingredient: action.ingredient,
        isOpen: true,
      };
    }
    case CLEAR_MODAL: {
      return {
        ...state,
        ingredient: {},
        isOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default currentIngredientReducer;