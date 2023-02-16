export const URL = `https://norma.nomoreparties.space/api`;

export const INGREDIENT_MODAL_TITLE = "Детали ингредиента";

export const checkEmptyIngredients = (ingredients) => {
   if(ingredients.bun.name && ingredients.fillings.length === 0) {
      return true;
   } else {
      return false;
   }
}

export const countResult = (state) => {
   const isEmpty = checkEmptyIngredients(state);
   if (isEmpty) return 0;
   let bunResult = 0;
   let fillingResult= 0;
   if (state.bun.price) {
     bunResult = state.bun.price * 2;
   }
   if (state.fillings.length >= 1) {
     fillingResult = state.fillings.reduce(
       (accumulator, currentObject) => accumulator + currentObject.price,
       0
     );
   }
   return bunResult + fillingResult;
 }
 