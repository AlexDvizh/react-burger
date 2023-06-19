import { createReducer } from "@reduxjs/toolkit";
import {
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
  wsConnecting,
} from "../actions/ws-feed";

import { WebSocketStatus, IWSOrder } from "../types/web-socket";

export interface IWSFeedReducer {
  status: WebSocketStatus;
  orders: Array<IWSOrder>;
  total: number | undefined;
  totalToday: number | undefined;
  error: unknown;
  ordersFeedLoaded: boolean;
}

const initialState: IWSFeedReducer = {
  status: WebSocketStatus.OFFLINE,
  orders: [],
  total: undefined,
  totalToday: undefined,
  error: null,
  ordersFeedLoaded: false,
};

export const wsFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebSocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebSocketStatus.ONLINE;
      state.error = null;
    })
    .addCase(wsClose, (state) => {
      state.status = WebSocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.ordersFeedLoaded = action.payload.dataReceived;
    });
});

export default wsFeedReducer;
