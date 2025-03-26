import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import {
  login as authLogin,
  createUserAccount,
  getCredentialsFromStorage,
  getUserInformation,
  setCredentialsInStorage,
} from "../../helpers/auth";
import { tError, tResponse, tUser, tUserInformation } from "@/constants/types";
import { errors } from "@/constants/errors";

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
  userInfo: { gender: "Male", language: "English" },
};

// Create async thunks with consistent naming (without "Thunk" suffix)
export const initializeUser = createAsyncThunk(
  "user/initializeUser",
  async (
    callback: (isGuest: boolean, isLoggedIn: boolean) => void,
    { rejectWithValue }
  ) => {
    try {
      if ((await AsyncStorage.getItem("IsGuest")) === "true") {
        callback(true, false);
        return { isGuest: true };
      }

      const credentials = await getCredentialsFromStorage();

      if (typeof credentials !== "object") {
        return rejectWithValue(credentials);
      }

      const { username, password } = credentials;

      if (!username || !password) {
        callback(false, false);
        return rejectWithValue("No credentials found");
      }

      const attempt = await authLogin(username, password);

      if (!attempt.success || !attempt.error) {
        callback(false, false);
        return rejectWithValue(attempt.error);
      }

      callback(false, true);
      return { username, token: attempt.token };
    } catch (error) {
      callback(false, false);
      return rejectWithValue("Initialization failed");
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (
    {
      username,
      password,
      callback,
    }: {
      username: string;
      password: string;
      callback: (message: tResponse) => void;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { user: typeof initialState };
      if (state.user.isGuest || state.user.token) {
        callback({ success: false, error: errors["Already authenticated"] });
        return rejectWithValue(5);
      }

      const attempt = await authLogin(username, password);
      callback({ success: attempt.success, error: attempt.error });

      if (!attempt.success || !attempt.token || attempt.error) {
        return rejectWithValue({
          success: attempt.success,
          error: attempt.error,
        });
      }

      return {
        username,
        token: attempt.token,
        userInfo: await getUserInformation(),
      };
    } catch (error) {
      callback({
        success: false,
        error: errors["Login failed unknown reason"],
      });
      return rejectWithValue({
        success: false,
        error: errors["Login failed unknown reason"],
      });
    }
  }
);

export const createAccount = createAsyncThunk(
  "user/createAccount",
  async (
    {
      user,
      userInformation,
      callback,
    }: {
      user: tUser;
      userInformation: tUserInformation;
      callback: (result: tResponse) => void;
    },
    {
      getState,
      rejectWithValue,
    }: { rejectWithValue: (error: tError) => void; getState: any }
  ) => {
    try {
      const state = getState() as { user: typeof initialState };

      if (!state.user || state.user.isGuest || state.user.token) {
        callback({ success: false, error: errors["Already authenticated"] });
        return rejectWithValue(errors["Already authenticated"]);
      }

      if (!user.username || !user.password || !userInformation.name) {
        callback({ success: false, error: errors["Insufficient information"] });
        return rejectWithValue(errors["Insufficient information"]);
      }

      const createAccountAttempt = await createUserAccount(
        user,
        userInformation
      );
      console.log("Attempted to create account (redux)", createAccountAttempt);

      if (!createAccountAttempt.success) {
        callback({ success: false, error: createAccountAttempt.error });
        return rejectWithValue(errors["Unknown error"]);
      }

      const credentials = await setCredentialsInStorage(
        user.username,
        user.password
      );
      if (!credentials.success) {
        callback({ success: false, error: credentials.error });
        return rejectWithValue(credentials.error || errors["Unknown error"]);
      }

      return;
    } catch (error) {
      callback({ success: false, error: errors["Unknown error"] });
      return rejectWithValue(errors["Unknown error"]);
    }
  }
);

export const continueAsGuest = createAsyncThunk(
  "user/continueAsGuest",
  async (
    {
      userInfo,
      callback,
    }: {
      userInfo: tUserInformation;
      callback: (success: boolean) => void;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { user: typeof initialState };

      if (state.user.isGuest || state.user.token) {
        callback(false);
        return rejectWithValue({
          success: false,
          error: errors["Already authenticated"],
        });
      }

      await AsyncStorage.setItem("IsGuest", "true");
      callback(true);
      return { success: true, userInfo };
    } catch (error) {
      callback(false);
      return rejectWithValue({
        success: false,
        error: errors["Unknown error"],
      });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isGuest = false;
      state.username = null;
      state.token = null;
      state.userInfo = null;
      AsyncStorage.removeItem("IsGuest");
      SecureStore.deleteItemAsync("username");
      SecureStore.deleteItemAsync("password");
    },
    setLanguage: (state, action: { payload: "English" | "Urdu" }) => {
      state.userInfo!.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle initialize user
    builder.addCase(initializeUser.fulfilled, (state, action) => {
      if ("isGuest" in action.payload) {
        state.isGuest = true;
      } else if ("username" in action.payload) {
        state.username = action.payload.username;
        state.token = action.payload.token;
      }
    });
    builder.addCase(initializeUser.rejected, (state, action) => {});

    // Handle login

    builder.addCase(login.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;

      if (typeof action.payload.userInfo === "object") {
        state.userInfo = action.payload.userInfo;
      }
    });
    builder.addCase(login.rejected, (state, action) => {});

    builder.addCase(createAccount.fulfilled, (state) => {});
    builder.addCase(createAccount.rejected, (state, action) => {});

    builder.addCase(continueAsGuest.fulfilled, (state, action) => {
      state.isGuest = true;
      state.userInfo = {
        ...action.payload.userInfo,
        language: state.userInfo?.language || action.payload.userInfo.language,
      };
    });
    builder.addCase(continueAsGuest.rejected, (state, action) => {});
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
