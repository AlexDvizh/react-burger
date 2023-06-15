import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postOrderRequest } from "../../utils/api";

 export interface IOrderSlice {
  status: string;
  orderId: number | undefined;
  error: unknown;
}

export const initialState: IOrderSlice = {
  status: "uninitialized",
  orderId: undefined,
  error: null,
};

export const setOrderId = createAsyncThunk(
  "order/setOrderId",
  async (ingredientsId: Array<string>) => {
    return await postOrderRequest(ingredientsId);
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setOrderId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setOrderId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderId = action.payload.order.number;
      })
      .addCase(setOrderId.rejected, (state, action) => {
        state.status = "succeeded";
        state.error = action.error;
      });
  },
});

export default orderSlice.reducer;