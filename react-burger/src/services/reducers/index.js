import { combineReducers } from "redux";

import ingredientsReducer from "./ingredients";
import currentIngredientReducer from "./currentIngredient";
import { constructorReducer } from "./constructorIngredients";
import { orderNumberReducer } from "./orderNumber";

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredient: currentIngredientReducer,
    burgerConstructor: constructorReducer,
    order: orderNumberReducer,
})

export default rootReducer;