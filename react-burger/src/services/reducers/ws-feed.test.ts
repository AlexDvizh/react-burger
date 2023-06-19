import reducer from "../reducers/ws-feed";
import {
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
  wsConnecting,
} from "../actions/ws-feed";
import { IWSFeedReducer } from "../reducers/ws-feed";
import { WebSocketStatus } from "../types/web-socket";
import { mockedWsFeedOrders } from "../../utils/mocked-data/mocked-ws";

const initialState: IWSFeedReducer = {
  status: WebSocketStatus.OFFLINE,
  orders: [],
  total: undefined,
  totalToday: undefined,
  error: null,
  ordersFeedLoaded: false,
};

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should handle feed/ws-connecting action", () => {
  expect(reducer(initialState, wsConnecting())).toEqual({
    ...initialState,
    status: WebSocketStatus.CONNECTING,
  });
});

test("should handle feed/ws-open action", () => {
  expect(reducer(initialState, wsOpen())).toEqual({
    ...initialState,
    status: WebSocketStatus.ONLINE,
    error: null,
  });
});

test("should handle feed/ws-close action", () => {
  expect(reducer(initialState, wsClose())).toEqual({
    ...initialState,
    status: WebSocketStatus.OFFLINE,
  });
});

test("should handle feed/ws-error action", () => {
  expect(
    reducer(initialState, wsError("Some error in ws-feed reducer"))
  ).toEqual({
    ...initialState,
    error: "Some error in ws-feed reducer",
  });
});

test("should handle feed/ws-message action", () => {
  expect(
    reducer(
      initialState,
      wsMessage({
        orders: mockedWsFeedOrders,
        total: 3333,
        totalToday: 25,
        dataReceived: true,
      })
    )
  ).toEqual({
    ...initialState,
    orders: mockedWsFeedOrders,
    total: 3333,
    totalToday: 25,
    ordersFeedLoaded: true,
  });
});