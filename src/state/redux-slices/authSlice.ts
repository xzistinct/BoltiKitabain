import { createSlice } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import { login as authLogin } from "../auth";
import { user } from "../user";

// Define the initial state using that type
const initialState: {
  isGuest: boolean;
  username: null | string;
  token: null | string;
} = {
  isGuest: false,
  username: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initAuth: (
      state,
      action: { payload: (isGuest: boolean, isLoggedIn: boolean) => void }
    ) => {
      (async () => {
        if ((await AsyncStorage.getItem("IsGuest")) === "true") {
          state.isGuest = true;
          action.payload(true, false);
          return;
        }
        const username = SecureStore.getItem("username");
        const password = SecureStore.getItem("password");
        if (!username || !password) {
          action.payload(false, false);
          return;
        }
        const attempt = authLogin(username, password);
        if (!attempt.success) {
          action.payload(false, false);
          return;
        }
        state.username = username;
        state.token = attempt.token;
        action.payload(false, true);
      })();
    },
    logout: (state) => {
      state.isGuest = false;
      state.username = null;
      state.token = null;
    },
    login: (
      state,
      action: { type: string; payload: { username: string; password: string } }
    ) => {
      const attempt = authLogin(
        action.payload.username,
        action.payload.password
      );

      if (!attempt.success) {
        return;
      }

      state.username = action.payload.username;
      state.token = attempt.token;
      state.isGuest = false;
    },
  },
});

export const { logout, login, initAuth } = authSlice.actions;

export default authSlice.reducer;
