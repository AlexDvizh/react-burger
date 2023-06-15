import { IAuthSliceState } from "./auth";
import reducer, { register, login, logout, getUser, updateUser } from "./auth";
import { mockedUser } from "../../utils/mocked-data/mocked-auth";

const initialState: IAuthSliceState = {
  registerStatus: "uninitialized",
  loginStatus: "uninitialized",
  logoutStatus: "uninitialized",
  getUserStatus: "uninitialized",
  updateUserStatus: "uninitialized",
  user: undefined,
  isLoggedIn: false,
  authChecked: false,
  error: null,
};

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual(initialState);
});

test("should handle auth/register/pending action", () => {
  expect(reducer(initialState, { type: register.pending.type })).toEqual({
    ...initialState,
    registerStatus: "loading",
  });
});

test("should handle auth/register/fulfilled action", () => {
  const { name, email } = mockedUser;
  expect(
    reducer(initialState, {
      type: register.fulfilled.type,
      payload: { user: mockedUser },
    })
  ).toEqual({
    ...initialState,
    registerStatus: "succeeded",
    loginStatus: "succeeded",
    isLoggedIn: true,
    user: { name: name, email: email },
  });
});

test("should handle auth/register/rejected action", () => {
  expect(
    reducer(initialState, {
      type: register.rejected.type,
      error: "Error in auth/register action",
    })
  ).toEqual({
    ...initialState,
    registerStatus: "failed",
    error: "Error in auth/register action",
  });
});

test("should handle auth/login/pending action", () => {
  expect(reducer(initialState, { type: login.pending.type })).toEqual({
    ...initialState,
    loginStatus: "loading",
  });
});

test("should handle auth/login/fulfilled action", () => {
  const { name, email } = mockedUser;
  expect(
    reducer(initialState, {
      type: login.fulfilled.type,
      payload: { user: mockedUser },
    })
  ).toEqual({
    ...initialState,
    loginStatus: "succeeded",
    isLoggedIn: true,
    user: { name: name, email: email },
  });
});

test("should handle auth/login/rejected action", () => {
  expect(
    reducer(initialState, {
      type: login.rejected.type,
      error: "Error in auth/login action",
    })
  ).toEqual({
    ...initialState,
    loginStatus: "failed",
    error: "Error in auth/login action",
    isLoggedIn: false,
  });
});

test("should handle auth/logout/pending action", () => {
  expect(reducer(initialState, { type: logout.pending.type })).toEqual({
    ...initialState,
    logoutStatus: "loading",
  });
});

test("should handle auth/logout/fulfilled action", () => {
  expect(
    reducer(initialState, {
      type: logout.fulfilled.type,
    })
  ).toEqual({
    ...initialState,
    logoutStatus: "succeeded",
    isLoggedIn: false,
    user: undefined,
  });
});

test("should handle auth/logout/rejected action", () => {
  expect(
    reducer(initialState, {
      type: logout.rejected.type,
      error: "Error in auth/logout action",
    })
  ).toEqual({
    ...initialState,
    logoutStatus: "failed",
    error: "Error in auth/logout action",
  });
});

test("should handle auth/getUser/pending action", () => {
  expect(reducer(initialState, { type: getUser.pending.type })).toEqual({
    ...initialState,
    getUserStatus: "loading",
  });
});

test("should handle auth/getUser/fulfilled action", () => {
  const { name, email } = mockedUser;
  expect(
    reducer(initialState, {
      type: getUser.fulfilled.type,
      payload: { user: mockedUser },
    })
  ).toEqual({
    ...initialState,
    getUserStatus: "succeeded",
    isLoggedIn: true,
    user: { name: name, email: email },
    authChecked: true,
  });
});

test("should handle auth/getUser/rejected action", () => {
  expect(
    reducer(initialState, {
      type: getUser.rejected.type,
      error: "Error in auth/getUser action",
    })
  ).toEqual({
    ...initialState,
    getUserStatus: "failed",
    error: "Error in auth/getUser action",
    isLoggedIn: false,
    authChecked: true,
  });
});

test("should handle auth/updateUser/pending action", () => {
  expect(reducer(initialState, { type: updateUser.pending.type })).toEqual({
    ...initialState,
    updateUserStatus: "loading",
  });
});

test("should handle auth/updateUser/fulfilled action", () => {
  const { name, email } = mockedUser;
  expect(
    reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: { user: mockedUser },
    })
  ).toEqual({
    ...initialState,
    updateUserStatus: "succeeded",
    user: { name: name, email: email },
  });
});

test("should handle auth/updateUser/rejected action", () => {
  expect(
    reducer(initialState, {
      type: updateUser.rejected.type,
      error: "Error in auth/updateUser action",
    })
  ).toEqual({
    ...initialState,
    updateUserStatus: "failed",
    error: "Error in auth/updateUser action",
  });
});