import { store } from "../..";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { rootReducer } from "../reducers";

type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    uuid: number;
};
  
export type TOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
};

export type TParams = {
    number?: string;
    id?: string;
};

export type TUser = {
    name: string;
    email: string;
};

export type TWSMessage = {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
};