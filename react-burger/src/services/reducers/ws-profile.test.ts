import reducer from "../reducers/ws-profile";
import {
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
  wsConnecting,
} from "../actions/ws-profile";
import { IWSProfileReducer } from "../reducers/ws-profile";
import { WebSocketStatus } from "../types/web-socket";
import { mockedWsFeedOrders } from "../../utils/mocked-data/mocked-ws";

const initialState: IWSProfileReducer = {
  status: WebSocketStatus.OFFLINE,
  orders: [],
  error: null,
  ordersProfileLoaded: false,
};

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should handle profile/ws-connecting action", () => {
  expect(reducer(initialState, wsConnecting())).toEqual({
    ...initialState,
    status: WebSocketStatus.CONNECTING,
  });
});

test("should handle profile/ws-open action", () => {
  expect(reducer(initialState, wsOpen())).toEqual({
    ...initialState,
    status: WebSocketStatus.ONLINE,
    error: null,
  });
});

test("should handle profile/ws-close action", () => {
  expect(reducer(initialState, wsClose())).toEqual({
    ...initialState,
    status: WebSocketStatus.OFFLINE,
  });
});

test("should handle profile/ws-error action", () => {
  expect(
    reducer(initialState, wsError("Some error in ws-profile reducer"))
  ).toEqual({
    ...initialState,
    error: "Some error in ws-profile reducer",
  });
});

test("should handle profile/ws-message action", () => {
  expect(
    reducer(
      initialState,
      wsMessage({
        orders: mockedWsFeedOrders,
        dataReceived: true,
      })
    )
  ).toEqual({
    ...initialState,
    orders: mockedWsFeedOrders,
    ordersProfileLoaded: true,
  });
});