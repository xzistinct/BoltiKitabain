import { createSlice } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import { login as authLogin, createUserAccount } from "../../helpers/auth";

import {
  dispatchLoginAttempMessage,
  loginAttemptMessage,
  tUserInformation,
} from "@/constants/types";

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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser: (
      state,
      action: { payload: (isGuest: boolean, isLoggedIn: boolean) => void }
    ) => {
      (async () => {
        if (initialized) {
          throw new Error("authSlice already initialized");
        }
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
        const attempt = await authLogin(username, password);
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
      (async () => {
        if (!initialized) {
          throw new Error("authSlice not initialized");
        }

        if (state.isGuest || state.token) {
          throw new Error("Already authenticated");
        }
        const attempt = await authLogin(
          action.payload.username,
          action.payload.password
        );
        if (!attempt.success || !attempt.token) {
          action.payload.callback(attempt.message);
          return;
        }

        console.log("Hello");

        state.username = null;
        state.token = null;

        console.log("hi");

        action.payload.callback(attempt.message);
      })();
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
        action.payload.callback(false);
      }

      if (state.isGuest || state.token) {
        action.payload.callback(false);
      }

      createUserAccount(action.payload.userInfo).then(
        (createAccountAttempt) => {
          console.log(
            "Attepted to create account (redux)",
            createAccountAttempt
          );
          if (createAccountAttempt.success) {
            action.payload.callback(true);
          } else {
            action.payload.callback(false);
          }
        }
      );
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

export const { logout, login, initializeUser, continueAsGuest, createAccount } =
  userSlice.actions;

export default userSlice.reducer;
