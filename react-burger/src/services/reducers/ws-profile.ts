import { createReducer } from "@reduxjs/toolkit";
import {
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
  wsConnecting,
} from "../actions/ws-profile";

import { WebSocketStatus, IWSOrder } from "../../types/web-socket";

interface IWSProfileReducer {
  status: WebSocketStatus;
  orders: Array<IWSOrder>;
  error: unknown;
  ordersProfileLoaded: boolean;
}

const initialState: IWSProfileReducer = {
  status: WebSocketStatus.OFFLINE,
  orders: [],
  error: null,
  ordersProfileLoaded: false,
};

export const wsProfileReducer = createReducer(initialState, (builder) => {
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
      state.ordersProfileLoaded = action.payload.dataReceived;
    });
});