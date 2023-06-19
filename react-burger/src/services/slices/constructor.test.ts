import reducer, {
  addBun,
  addFilling,
  deleteFilling,
  moveFilling,
  //   moveFilling,
} from "./constructor";
import {
  mockedBun,
  mockedIngredientsDataWithQty,
  mockedFilling,
} from "../../utils/mocked-data/mocked-data-general";
import { mockedIngredientsWithNanoId } from "../../utils/mocked-data/mocked-data-constructor";
import { IConstructorSlice } from "./constructor";
// import { TIngredientWithUniqueId } from "../../utils/types/ingredients-types";

const initialState: IConstructorSlice = {
  ingredients: {
    bun: {},
    fillings: [],
  },
};

test("should return the initial state", () => {
  expect(reducer(initialState, { type: undefined })).toEqual({
    ingredients: { bun: {}, fillings: [] },
  });
});

test("should handle adding bun to ingredints: bun", () => {
  const initialState = { ingredients: { bun: {}, fillings: [] } };
  expect(reducer(initialState, addBun(mockedBun))).toEqual({
    ingredients: {
      bun: { ...mockedBun },
      fillings: [],
    },
  });
});

test("should handle adding fillings to empty ingredints: fillings", () => {
  const initialState = { ingredients: { bun: {}, fillings: [] } };
  const addedFilling = mockedIngredientsDataWithQty.find(
    (el) => el._id === "643d69a5c3f7b9001cfa093e"
  );
  const expectedFilling = { ...mockedFilling };
  expect(
    reducer(
      initialState,
      addFilling({ ingredient: addedFilling, uuid: "1mjhDAF9C2nhBmo5kzDVW" })
    )
  ).toEqual({
    ingredients: {
      bun: {},
      fillings: [{ ...expectedFilling }],
    },
  });
});

test("should handle adding fillings to not empty ingredients: fillings", () => {
  const initialState = {
    ingredients: { bun: {}, fillings: [{ ...mockedFilling }] },
  };
  const addedFilling = mockedIngredientsDataWithQty.find(
    (el) => el._id === "643d69a5c3f7b9001cfa093e"
  );
  const expectedFilling = { ...mockedFilling };
  expect(
    reducer(
      initialState,
      addFilling({ ingredient: addedFilling, uuid: "1mjhDAF9C2nhBmo5kzDVW" })
    )
  ).toEqual({
    ingredients: {
      bun: {},
      fillings: [...initialState.ingredients.fillings, { ...expectedFilling }],
    },
  });
});

test("should handle deleting filling", () => {
  const initialState = {
    ingredients: { bun: { ...mockedBun }, fillings: [{ ...mockedFilling }] },
  };
  expect(reducer(initialState, deleteFilling(mockedFilling.uuid))).toEqual({
    ingredients: {
      bun: { ...mockedBun },
      fillings: [],
    },
  });
});

test("should handle moving fillings", () => {
  const initialState = {
    ingredients: { bun: {}, fillings: [...mockedIngredientsWithNanoId] },
  };
  const movedIngredient = mockedIngredientsWithNanoId.shift();
  mockedIngredientsWithNanoId.splice(1, 0, movedIngredient!);
  expect(reducer(initialState, moveFilling({ from: 0, to: 1 }))).toEqual({
    ingredients: {
      bun: {},
      fillings: [...mockedIngredientsWithNanoId],
    },
  });
});