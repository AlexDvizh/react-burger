import { 
    GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_ERROR, INGREDIENTS_COUNTER_INCREASE, 
    INGREDIENTS_COUNTER_DECREASE, CHANGE_BUN 
} from "../actions/ingredients";

const initialState = {
    ingredients: [],
    isLoading: false,
    hasError: false
}

const ingredientsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredients: action.ingredients.map((ingredient) => {
                    ingredient['count'] = 0;
                    return ingredient;
                }),
                isLoading: false,
                hasError: false
            }
        case GET_INGREDIENTS_ERROR:
            return {
                ...state,
                isLoading: false,
                hasError: true,
            }
        case INGREDIENTS_COUNTER_INCREASE:
            return {
                ...state,
                ingredients: [...state.ingredients].map((ingredient) => {
                    return ingredient._id === action.id 
                        ? 
                        { ...ingredient, count: ++ingredient.count } 
                        : 
                        ingredient
                })
            }
        case INGREDIENTS_COUNTER_DECREASE:
            return {
                ...state,
                ingredients: [...state.ingredients].map((ingredient) => {
                    return ingredient._id === action.id 
                        ? 
                        { ...ingredient, count: --ingredient.count } 
                        : 
                        ingredient
                })
            }
        case CHANGE_BUN:
            return {
                ...state,
                ingredients: [...state.ingredients].map((ingredient) => {
                    return ingredient.type === 'bun' 
                        ? 
                        { ...ingredient, count: 0 } 
                        : 
                        ingredient
                })
            }
        default:
            return state;
    }
}

export default ingredientsReducer;