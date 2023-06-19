import reducer, {
  fetchIngredients,
  counterIncrease,
  counterDecrease,
  changeBun,
} from "./ingredients";
import { IIngredientsSlice } from "./ingredients";
import {
  mockedIngredientsData,
  mockedIngredientsDataWithQty,
  mockedBun,
} from "../../utils/mocked-data/mocked-data-general";
import { URL } from "../../utils/utils";
import "core-js/actual/structured-clone";
import { TIngredient } from "../../utils/types/ingredients-types";

const initialState: IIngredientsSlice = {
  status: "uninitialized",
  ingredients: [],
  ingredientsLoaded: false,
  error: null,
};

test("should return the initial state", () => {
  expect(reducer(initialState, { type: undefined })).toEqual({
    status: "uninitialized",
    ingredients: [],
    ingredientsLoaded: false,
    error: null,
  });
});

test("should handle sending a POST request to fetch ingredients from the server", () => {
  expect(
    reducer(initialState, { type: fetchIngredients.pending.type })
  ).toEqual({
    status: "loading",
    ingredients: [],
    ingredientsLoaded: false,
    error: null,
  });
});

test("should handle getting ingredients from the server and setting state.ingredients and adding to each ingredient 'count' property equals to 0", () => {
  expect(
    reducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: [...mockedIngredientsData],
    })
  ).toEqual({
    status: "succeeded",
    ingredients: [...mockedIngredientsDataWithQty],
    ingredientsLoaded: true,
    error: null,
  });
});

test(`should handle failed POST request to server ${URL}/ingredients`, () => {
  expect(
    reducer(initialState, {
      type: fetchIngredients.rejected.type,
      error: "Failed to fetch ingredients",
    })
  ).toEqual({
    status: "failed",
    ingredients: [],
    ingredientsLoaded: false,
    error: "Failed to fetch ingredients",
  });
});

test("should handle an ingredeint's count property to be increased by 1", () => {
  const previousState: IIngredientsSlice = {
    status: "succeeded",
    ingredients: structuredClone(mockedIngredientsDataWithQty),
    ingredientsLoaded: true,
    error: null,
  };
  const expectedIngredients = structuredClone(mockedIngredientsDataWithQty);
  expectedIngredients[0].count = 1;
  expect(reducer(previousState, counterIncrease(mockedBun._id))).toEqual({
    status: "succeeded",
    ingredients: expectedIngredients,
    ingredientsLoaded: true,
    error: null,
  });
});

test("should handle an ingredeint's count property to be decreased by 1", () => {
  const previousIngredients = structuredClone(mockedIngredientsDataWithQty);
  previousIngredients[0].count = 1;
  const previousState: IIngredientsSlice = {
    status: "succeeded",
    ingredients: previousIngredients,
    ingredientsLoaded: true,
    error: null,
  };
  const expectedIngredients = structuredClone(mockedIngredientsDataWithQty);
  expectedIngredients[0].count = 0;
  expect(reducer(previousState, counterDecrease(mockedBun._id))).toEqual({
    status: "succeeded",
    ingredients: expectedIngredients,
    ingredientsLoaded: true,
    error: null,
  });
});

test("should handle setting bun's count to 0", () => {
  //copy mockedData
  const previousIngredients: Array<TIngredient> = structuredClone(
    mockedIngredientsDataWithQty
  );
  // find firstBun and its index in copied array
  const firstBun = previousIngredients.find((el) => el.type === "bun");
  const firstBunIndex = previousIngredients.findIndex(
    (el) => el.type === "bun"
  );
  // delete from the copied array first bun and add new bun with count: 1 to the same postiion
  previousIngredients.splice(firstBunIndex, 1, { ...firstBun!, count: 1 });
  const previousState: IIngredientsSlice = {
    status: "succeeded",
    ingredients: [...previousIngredients],
    ingredientsLoaded: true,
    error: null,
  };
  //copy mockedData
  const expectedIngredients: Array<TIngredient> = structuredClone(
    mockedIngredientsDataWithQty
  );
  // find firstBun and its index in copied array
  const newFirstBun = expectedIngredients.find((el) => el.type === "bun");
  const newFirstBunIndex = expectedIngredients.findIndex(
    (el) => el.type === "bun"
  );
  // delete from the copied array first bun and add new bun with count: 0 to the same postiion
  expectedIngredients.splice(newFirstBunIndex, 1, { ...newFirstBun!, count: 0 });
  expect(reducer(previousState, changeBun())).toEqual({
    status: "succeeded",
    ingredients: [...expectedIngredients],
    ingredientsLoaded: true,
    error: null,
  });
});