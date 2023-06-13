import { createAction } from "@reduxjs/toolkit";

export const connect = createAction<string, "profile/connect">(
  "profile/connect"
);
export const disconnect = createAction("profile/disconnect");
export const wsConnecting = createAction("profile/ws_connecting");
export const wsOpen = createAction("profile/ws_open");
export const wsClose = createAction("profile/ws_close");
export const wsError = createAction<string, "profile/ws_error">(
  "profile/ws_error"
);
export const wsMessage = createAction<any, "profile/ws_message">(
  "profile/ws_message"
);