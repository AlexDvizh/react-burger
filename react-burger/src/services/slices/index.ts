import ingredientsReducer from "./ingredients";
import constructorReducer from "./constructor";
import orderReducer from "./order";
import authReducer from "./auth";
import wsFeedReducer from "../reducers/ws-feed";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "../socketMiddleware";

import {
  connect as FeedWsConnect,
  disconnect as FeedWsDisconnect,
  wsConnecting as FeedWsConnecting,
  wsOpen as FeedWsOpen,
  wsClose as FeedWsClose,
  wsError as FeedWsError,
  wsMessage as FeedWsMessage,
} from "../actions/ws-feed";

import {
  connect as ProfileWsConnect,
  disconnect as ProfileWsDisconnect,
  wsConnecting as ProfileWsConnecting,
  wsOpen as ProfileWsOpen,
  wsClose as ProfileWsClose,
  wsError as ProfileWsError,
  wsMessage as ProfileWsMessage,
} from "../actions/ws-profile";
import { wsProfileReducer } from "../reducers/ws-profile";

const wsFeedActions = {
  wsConnect: FeedWsConnect,
  wsDisconnect: FeedWsDisconnect,
  wsConnecting: FeedWsConnecting,
  onOpen: FeedWsOpen,
  onClose: FeedWsClose,
  onError: FeedWsError,
  onMessage: FeedWsMessage,
};

const wsProfileActions = {
  wsConnect: ProfileWsConnect,
  wsDisconnect: ProfileWsDisconnect,
  wsConnecting: ProfileWsConnecting,
  onOpen: ProfileWsOpen,
  onClose: ProfileWsClose,
  onError: ProfileWsError,
  onMessage: ProfileWsMessage,
};

const wsFeedMiddleware = socketMiddleware(wsFeedActions);
const wsProfileMiddleware = socketMiddleware(wsProfileActions);

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    constructorBurger: constructorReducer,
    order: orderReducer,
    auth: authReducer,
    wsFeed: wsFeedReducer,
    wsProfile: wsProfileReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(wsFeedMiddleware, wsProfileMiddleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;