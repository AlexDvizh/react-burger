import { uuid } from 'uuidv4';

import { ingredients } from "../../utils/prop-types";
import { 
    ADD_BUN, DELETE_BUN,
    ADD_FILLING, DELETE_FILLING,
    MOVE_FILLING 
} from "../actions/constructorIngredients";

const initialState = {
    ingredients: {
        bun: {},
        fillings: []
    },
    result: 0
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUN: {
          return {
            ...state,
            ingredients: {
                ...state.ingredients,
                bun: action.ingredient
            }
          };
        }
        case DELETE_BUN: {
            return {
              ...state,
              ingredients: {
                  ...state.ingredients,
                  bun: {}
              }
            };
        }
        case ADD_FILLING: {
            return {
              ...state,
              ingredients: {
                  ...state.ingredients,
                  fillings: [...state.ingredients.fillings].concat([{...action.ingredients, uuid: uuid()}])
              }
            }
        }
        case DELETE_FILLING: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    fillings: [...state.ingredients.fillings].filter((ingredient) => {
                        return ingredient.uuid !== action.uuid
                    })
                }
            };
        }
        case MOVE_FILLING: {
            const element = state.ingredients.fillings.splice(action.from, 1)[0];
            state.ingredients.fillings.splice(action.to, 0, element)
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    fillings: state.ingredients.fillings
                }
            }
        }
        default: {
            return state;
        }
    }
}