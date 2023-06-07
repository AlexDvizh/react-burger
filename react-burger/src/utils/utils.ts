import { TIngredientsConstructor, TIngredientWithUniqueId, TIngredient, } from "./types/ingredients-types";

export const URL = `https://norma.nomoreparties.space/api`;
export const WS_ORDERS_API = "wss://norma.nomoreparties.space/orders/all";
export const WS_PROFILE_ORDERS_API = "wss://norma.nomoreparties.space/orders";

export const INGREDIENT_MODAL_TITLE = "Детали ингредиента";
 
 export function countResult(state: TIngredientsConstructor) {
   const isEmpty = isEmptyConstuctor(state);
   const { fillings }: { fillings: TIngredientWithUniqueId[] } = state;
   if (isEmpty) return 0;
   let bunTotal = 0;
   let fillingTotal = 0;
   if (state.bun.price) {
     bunTotal = state.bun.price * 2;
   }
   if (state.fillings.length >= 1) {
     fillingTotal = fillings.reduce(
       (accumulator: number, currentObj: TIngredient) =>
         accumulator + currentObj.price,
       0
     );
   }
   return bunTotal + fillingTotal;
 }
 
 export function getIngredientsId(
   bun: TIngredient,
   fillings: TIngredientWithUniqueId[]
 ) {
   const ingredientsId = [];
   ingredientsId.push(bun._id);
   if (Array.isArray(fillings)) {
     fillings.forEach((el) => {
       ingredientsId.push(el._id);
     });
   }
   ingredientsId.push(bun._id);
   return ingredientsId;
 }
 
 export function isEmptyConstuctor(ingredients: TIngredientsConstructor) {
   if (!ingredients.bun.name && ingredients.fillings.length === 0) {
     return true;
   } else {
     return false;
   }
 }
 
 export function checkBun(ingredients: TIngredientsConstructor) {
   if (!ingredients.bun.name) return true;
   return false;
 }
 
 export function checkFillings(ingredients: TIngredientsConstructor) {
   if (ingredients.fillings.length === 0) return true;
   return false;
 }
 
 export function getImgUrlList(
   ingredientsIdArray: Array<string>,
   ingredients: Array<TIngredient>
 ) {
   const imgList = ingredientsIdArray.map((id) => {
     const ingredientImgUrl = ingredients.find(
       (ingredient) => ingredient._id === id
     )?.image_mobile;
     return ingredientImgUrl;
   });
   const notDisplayedImgsQty = imgList.length - 5;
   const urlObj = { imgList: imgList.slice(0, 6), notDisplayedImgsQty };
   return urlObj;
 }
 
 // Исправить после удаления некорректных заказов на сервере
 export function getIngredientInfoById(
   ingredientsIdArray: Array<string>,
   ingredients: Array<TIngredient>
 ) {
   const urlPriceName: Array<any> = [];
   const checkedId: Array<string> = [];
   ingredientsIdArray.forEach((id) => {
     if (id) {
       const ingredient = ingredients.find((el) => el._id === id);
       if (!checkedId.includes(ingredient!._id)) {
         urlPriceName.push({
           _id: ingredient?._id,
           url: ingredient?.image_mobile,
           price: ingredient?.price,
           name: ingredient?.name,
           qty: 1,
         });
         checkedId.push(id);
       } else {
         urlPriceName.forEach((item, index) => {
           if (item._id === id) {
             urlPriceName[index].qty += 1;
           }
         });
       }
     }
   });
   return urlPriceName;
 }
 
 export function countTotalById(
   ingredientsIdArray: Array<string>,
   ingredients: Array<TIngredient>
 ) {
   let total: number = 0;
   ingredientsIdArray.forEach((id) => {
     if (id) {
       total += ingredients.find((ingredient) => ingredient._id === id)!.price;
     } else {
       total += 0;
     }
   });
   return total;
 }