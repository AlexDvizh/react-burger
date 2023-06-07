import { TIngredient, TIngredientResponse } from "./ingredients-types";

export interface IResponse<T> extends Response {
  json(): Promise<T>;
}

export interface IUser {
  email: string;
  name: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm extends ILoginForm {
  name: string;
}

export interface IUpdateUserForm extends IUser {
  password?: string | null;
}

export interface IResetPasswordForm {
  password: string;
  token: string;
}

export interface IRequestOptions {
  method?: string;
  body?: string;
  headers?: { "Content-Type": string; Authorization?: string };
}

export interface IRequestWithRefreshOptions {
  method: string;
  body?: string;
  headers: { "Content-Type": string; Authorization: string | undefined };
}

interface IApiResponse {
  success: boolean;
  message?: string;
}

export interface IGetIngredientsResponse extends IApiResponse {
  data?: Array<TIngredient>;
}

interface IOrder {
  createAt: string;
  ingredients: Array<TIngredientResponse>;
  name: string;
  number: number;
  owner: IUser & { createAt: string; updateAt: string };
  price: number;
  status: string;
  updateAt: string;
  _id: string;
}

export interface IOrderResponse extends IApiResponse {
  name: string;
  order: IOrder;
}

export interface IAuthResponse extends IApiResponse {
  accessToken?: string;
  refreshToken?: string;
  user?: IUser;
}