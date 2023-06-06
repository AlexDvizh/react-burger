import { createAction } from "@reduxjs/toolkit";

export const connect = createAction<string, "feed/connect">("feed/connect");
export const disconnect = createAction("feed/disconnect");
export const wsConnecting = createAction("feed/ws_connecting");
export const wsOpen = createAction("feed/ws_open");
export const wsClose = createAction("feed/ws_close");
export const wsError = createAction<string, "feed/ws_error">("feed/ws_error");
export const wsMessage = createAction<any, "feed/ws_message">(
  "feed/ws_message"
);