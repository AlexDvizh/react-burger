import { TIngredientsWithUniqueId, TIngredientWithUniqueId, TIngredient, } from "./types/ingredients-types";

export const URL = `https://norma.nomoreparties.space/api`;

export const INGREDIENT_MODAL_TITLE = "Детали ингредиента";

export const checkEmptyIngredients = (ingredients: TIngredientsWithUniqueId) => {
   if(ingredients.bun.name && ingredients.fillings.length === 0) {
      return true;
   } else {
      return false;
   }
}

export const countResult = (state: TIngredientsWithUniqueId) => {
   const isEmpty = checkEmptyIngredients(state);
   const { fillings }: { fillings: TIngredientWithUniqueId[] } = state;
   if (isEmpty) return 0;
   let bunResult = 0;
   let fillingResult= 0;
   if (state.bun.price) {
     bunResult = state.bun.price * 2;
   }
   if (state.fillings.length >= 1) {
      //@ts-ignore
     fillingResult = state.fillings.reduce(
       (accumulator: number, currentObject: TIngredient) => accumulator + currentObject.price,
       0
     );
   }
   return bunResult + fillingResult;
 }
 