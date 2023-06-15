import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIngredientsRequest } from "../../utils/api";
import { TIngredient } from "../../utils/types/ingredients-types";

export interface IIngredientsSlice {
  status: string;
  ingredients: Array<TIngredient>;
  ingredientsLoaded: boolean;
  error: unknown;
}

export const initialState: IIngredientsSlice = {
  status: "uninitialized",
  ingredients: [],
  ingredientsLoaded: false,
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const res = await getIngredientsRequest();
    return res.data;
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    counterIncrease(state, action) {
      state.ingredients = state.ingredients.map((el) =>
        el._id === action.payload ? { ...el, qty: el.count + 1 } : el
      );
    },
    counterDecrease(state, action) {
      state.ingredients = state.ingredients.map((el) =>
        el._id === action.payload ? { ...el, qty: el.count - 1 } : el
      );
    },
    changeBun(state) {
      state.ingredients = state.ingredients.map((el) =>
        el.type === "bun" ? { ...el, qty: 0 } : el
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ingredients = action.payload!.map((el) => {
          el["count"] = 0;
          return el;
        });
        state.ingredientsLoaded = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.ingredients = [];
        state.error = action.error;
      });
  },
});

export const { counterIncrease, counterDecrease, changeBun } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;