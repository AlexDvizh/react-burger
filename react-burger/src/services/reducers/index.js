import { combineReducers } from "redux";

import ingredientsReducer from "./ingredients";
import currentIngredientReducer from "./currentIngredient";
import { constructorReducer } from "./constructorIngredients";
import { orderNumberReducer } from "./orderNumber";
import { userReducer } from "./user";
import { authReducer } from "./authentication";

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredient: currentIngredientReducer,
    burgerConstructor: constructorReducer,
    order: orderNumberReducer,
    user: userReducer,
    auth: authReducer
})

export default rootReducer;