import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  loading: boolean;
  error: string | null;
} = {
  isGuest: false,
  username: null,
  token: null,
  userInfo: null,
  loading: false,
  error: null,
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

      const username = await SecureStore.getItem("username");
      const password = await SecureStore.getItem("password");

      if (!username || !password) {
        callback(false, false);
        return rejectWithValue("No credentials found");
      }

      const attempt = await authLogin(username, password);

      if (!attempt.success) {
        callback(false, false);
        return rejectWithValue(attempt.message);
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
      callback: (message: dispatchLoginAttempMessage) => void;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { user: typeof initialState };
      if (state.user.isGuest || state.user.token) {
        callback("ALREADY_AUTHENTICATED");
        return rejectWithValue("Already authenticated");
      }

      const attempt = await authLogin(username, password);
      callback(attempt.message);

      if (!attempt.success || !attempt.token) {
        return rejectWithValue(attempt.message);
      }

      // Save credentials for auto-login
      await SecureStore.setItemAsync("username", username);
      await SecureStore.setItemAsync("password", password);

      return { username, token: attempt.token };
    } catch (error) {
      callback("UNKNOWN_ERROR");
      return rejectWithValue("Login failed");
    }
  }
);

export const createAccount = createAsyncThunk(
  "user/createAccount",
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

      if (!state.user || state.user.isGuest || state.user.token) {
        callback(false);
        return rejectWithValue("Already authenticated");
      }

      const createAccountAttempt = await createUserAccount(userInfo);
      console.log("Attempted to create account (redux)", createAccountAttempt);

      callback(createAccountAttempt.success);

      if (!createAccountAttempt.success) {
        return rejectWithValue("Account creation failed");
      }

      return { success: true };
    } catch (error) {
      callback(false);
      return rejectWithValue("Account creation failed");
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
        return rejectWithValue("Already authenticated");
      }

      await AsyncStorage.setItem("IsGuest", "true");
      callback(true);
      return { userInfo };
    } catch (error) {
      callback(false);
      return rejectWithValue("Failed to continue as guest");
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
  },
  extraReducers: (builder) => {
    // Handle initialize user
    builder.addCase(initializeUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(initializeUser.fulfilled, (state, action) => {
      state.loading = false;
      if ("isGuest" in action.payload) {
        state.isGuest = true;
      } else if ("username" in action.payload) {
        state.username = action.payload.username;
        state.token = action.payload.token;
      }
    });
    builder.addCase(initializeUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.username = action.payload.username;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle create account
    builder.addCase(createAccount.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createAccount.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Handle continue as guest
    builder.addCase(continueAsGuest.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(continueAsGuest.fulfilled, (state, action) => {
      state.loading = false;
      state.isGuest = true;
      state.userInfo = action.payload.userInfo;
    });
    builder.addCase(continueAsGuest.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
