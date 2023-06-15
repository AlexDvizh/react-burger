import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerRequest,
  loginRequest,
  logoutRequest,
  getUserRequest,
  updateUserRequest,
} from "../../utils/api";
import {
  IRegisterForm,
  ILoginForm,
  IUpdateUserForm,
  IUser,
} from "../../utils/types/api-types";
import { setCookie } from "../../utils/cookie";
import { deleteCookie } from "../../utils/cookie";

export interface IAuthSliceState {
  registerStatus: string;
  loginStatus: string;
  logoutStatus: string;
  getUserStatus: string;
  updateUserStatus: string;
  user: undefined | IUser;
  isLoggedIn: boolean;
  authChecked: boolean;
  error: unknown;
}

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

export const register = createAsyncThunk(
  "auth/register",
  async (form: IRegisterForm) => {
    const res = await registerRequest(form);
    if (res.accessToken && res.refreshToken) {
      setCookie(res.accessToken);
      window.localStorage.setItem("refreshToken", res.refreshToken);
    }
    return res;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (form: ILoginForm) => {
    const res = await loginRequest(form);
    if (res.accessToken && res.refreshToken) {
      setCookie(res.accessToken);
      window.localStorage.setItem("refreshToken", res.refreshToken);
    }
    return res;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const res = await logoutRequest();
  if (res.success) {
    deleteCookie();
    window.localStorage.clear();
  }
  return res;
});

export const getUser = createAsyncThunk("auth/getUser", async () => {
  return await getUserRequest();
});

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (form: IUpdateUserForm) => {
    return await updateUserRequest(form);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        const { name, email } = action.payload.user as IUser;
        state.registerStatus = "succeeded";
        state.loginStatus = "succeeded";
        state.logoutStatus = "uninitialized";
        state.updateUserStatus = "uninitialized";
        state.isLoggedIn = true;
        state.user = {
          name: name,
          email: email,
        };
      })
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.loginStatus = "uninitialized";
        state.logoutStatus = "uninitialized";
        state.updateUserStatus = "uninitialized";
        state.error = action.error;
        state.isLoggedIn = false;
      })
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        const { name, email } = action.payload.user as IUser;
        state.registerStatus = "uninitialized";
        state.loginStatus = "succeeded";
        state.logoutStatus = "uninitialized";
        state.updateUserStatus = "uninitialized";
        state.isLoggedIn = true;
        state.user = {
          name: name,
          email: email,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.registerStatus = "uninitialized";
        state.logoutStatus = "uninitialized";
        state.updateUserStatus = "uninitialized";
        state.error = action.error;
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logoutStatus = "succeeded";
        state.loginStatus = "uninitialized";
        state.registerStatus = "uninitialized";
        state.updateUserStatus = "uninitialized";
        state.isLoggedIn = false;
        state.user = undefined;
        state.authChecked = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutStatus = "failed";
        state.loginStatus = "uninitialized";
        state.registerStatus = "uninitialized";
        state.updateUserStatus = "uninitialized";
        state.error = action.error;
        state.isLoggedIn = false;
      })
      .addCase(getUser.pending, (state) => {
        state.getUserStatus = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const { name, email } = action.payload.user as IUser;
        state.getUserStatus = "succeeded";
        state.isLoggedIn = true;
        state.user = {
          name: name,
          email: email,
        };
        state.error = null;
        state.authChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUserStatus = "failed";
        state.error = action.error;
        state.isLoggedIn = false;
        state.authChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { name, email } = action.payload.user as IUser;
        state.updateUserStatus = "succeeded";
        state.user = {
          name: name,
          email: email,
        };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserStatus = "failed";
        state.error = action.error;
      });
  },
});

export default authSlice.reducer;