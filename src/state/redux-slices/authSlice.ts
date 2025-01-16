import { createSlice } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import { login as authLogin } from "../auth";

import {
  dispatchLoginAttempMessage,
  loginAttemptMessage,
  tUserInformation,
} from "@/constants/types";
import { user } from "../user";

// Define the initial state using that type
const initialState: {
  isGuest: boolean;
  username: null | string;
  token: null | string;
  userInfo: tUserInformation | null;
} = {
  isGuest: false,
  username: null,
  token: null,
  userInfo: null,
};

let initialized = false;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initAuth: (
      state,
      action: { payload: (isGuest: boolean, isLoggedIn: boolean) => void }
    ) => {
      (async () => {
        initialized = true;
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
      if (!initialized) {
        throw new Error("authSlice not initialized");
      }
      state.isGuest = false;
      state.username = null;
      state.token = null;
    },
    login: (
      state,
      action: {
        type: string;
        payload: {
          username: string;
          password: string;
          callback: (message: dispatchLoginAttempMessage) => void;
        };
      }
    ) => {
      if (!initialized) {
        throw new Error("authSlice not initialized");
      }

      if (state.isGuest || state.token) {
        throw new Error("Already authenticated");
      }
      const attempt = authLogin(
        action.payload.username,
        action.payload.password
      );

      if (!attempt.success) {
        action.payload.callback(attempt.message);
        return;
      }

      state.username = action.payload.username;
      state.token = attempt.token;
      state.isGuest = false;

      action.payload.callback(attempt.message);
    },
    createAccount: (
      state,
      action: {
        payload: {
          userInfo: tUserInformation;
          callback: (sucess: boolean) => void;
        };
      }
    ) => {
      if (!initialized) {
        throw new Error("authSlice not initialized");
      }

      if (state.isGuest || state.token) {
        throw new Error("Already authenticated");
      }

      if (true) {
        state.userInfo = action.payload.userInfo;
        action.payload.callback(true);
      }
    },
    continueAsGuest: (
      state,
      action: {
        payload: {
          userInfo: tUserInformation;
          callback: (sucess: boolean) => void;
        };
      }
    ) => {
      if (!initialized) {
        throw new Error("authSlice not initialized");
      }

      if (state.isGuest || state.token) {
        throw new Error("Already authenticated");
      }
      if (true) {
        state.userInfo = action.payload.userInfo;
        state.isGuest = true;
        action.payload.callback(true);
      }
    },
  },
});

export const { logout, login, initAuth } = authSlice.actions;

export default authSlice.reducer;
