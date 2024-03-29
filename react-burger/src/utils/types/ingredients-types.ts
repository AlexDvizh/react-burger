export type TIngredientResponse = {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TIngredient = TIngredientResponse & { count: number };

export type TIngredientWithUniqueId = TIngredient & { uuid: string };

export type TIngredientsConstructor = {
  bun: TIngredient | any;
  fillings: TIngredientWithUniqueId[] | Array<any>;
};