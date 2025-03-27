import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  login as authLogin,
  clearUserFromStorage,
  createUserAccount,
  getCredentialsFromStorage,
  getUserInformationFromStorage,
  setCredentialsInStorage,
  setUserInformationInStorage,
} from "../../helpers/auth";
import { tError, tResponse, tUser, tUserInformation } from "@/constants/types";
import { errors, getErrorFromCode } from "@/constants/errors";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

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
    { rejectWithValue }: { rejectWithValue: (error: tError) => void }
  ): Promise<void | {
    isGuest: boolean;
    username?: string;
    token?: string;
    userInfo: tUserInformation;
  }> => {
    console.log("Initializing user");
    try {
      const userInfo = await getUserInformationFromStorage();
      if (!userInfo) {
        callback(false, false);
        return rejectWithValue(errors["Failed to retrieve user information"]);
      } else if (typeof userInfo !== "object") {
        callback(false, false);
        return rejectWithValue(userInfo);
      }
      const credentials = await getCredentialsFromStorage();

      if (credentials === "IsGuest") {
        console.log("User is guest");
        callback(true, false);
        return { isGuest: true, userInfo };
      }

      if (typeof credentials !== "object") {
        console.log("Failed to get credentials from storage", credentials);
        callback(false, false);
        return rejectWithValue(credentials);
      }

      const { username, password } = credentials;

      console.log("Got credentials", username, password);

      if (!username || !password) {
        callback(false, false);
        return rejectWithValue(
          errors["Failed to get credentials from storage"]
        );
      }

      console.log("Got user information", userInfo);

      const attempt = await authLogin(username, password);

      if (attempt.error === errors["Invalid credentials"]) {
        callback(false, false);

        return rejectWithValue(
          (await clearUserFromStorage()).error || attempt.error
        );
      } else if (attempt.error) {
        callback(false, false);
        return rejectWithValue(attempt.error);
      }

      callback(false, true);
      return {
        username,
        token: attempt.token || undefined,
        userInfo,
        isGuest: false,
      };
    } catch (error) {
      callback(false, false);
      return rejectWithValue(errors["Unknown error"]);
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
    {
      getState,
      rejectWithValue,
    }: { rejectWithValue: (error: tError) => void; getState: any }
  ): Promise<void | { token: string; userInfo: tUserInformation }> => {
    try {
      const state = getState() as { user: typeof initialState };
      if (state.user.isGuest || state.user.token) {
        callback({ success: false, error: errors["Already authenticated"] });
        return rejectWithValue(errors["Already authenticated"]);
      }

      const attempt = await authLogin(username, password);
      callback({ success: attempt.success, error: attempt.error });

      if (
        !attempt.success ||
        !attempt.token ||
        attempt.error ||
        !attempt.userInformation
      ) {
        return rejectWithValue(
          attempt.error || errors["Login failed unknown reason"]
        );
      }

      await setCredentialsInStorage(username, password);
      await setUserInformationInStorage(attempt.userInformation);

      console.log(await getUserInformationFromStorage());
      console.log(await getCredentialsFromStorage());

      return {
        token: attempt.token,
        userInfo: attempt.userInformation,
      };
    } catch (error) {
      callback({
        success: false,
        error: errors["Login failed unknown reason"],
      });
      return rejectWithValue(errors["Login failed unknown reason"]);
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
  ): Promise<void> => {
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
      callback: (response: tResponse) => void;
    },
    {
      getState,
      rejectWithValue,
    }: { rejectWithValue: (error: tError) => void; getState: any }
  ): Promise<void | tUserInformation> => {
    try {
      const state = getState() as { user: typeof initialState };

      if (state.user.isGuest || state.user.token) {
        callback({ success: false, error: errors["Already authenticated"] });
        return rejectWithValue(errors["Already authenticated"]);
      }

      await AsyncStorage.setItem("IsGuest", "true");
      callback({ success: true });
      return userInfo;
    } catch (error) {
      callback({ success: false, error: errors["Unknown error"] });
      return rejectWithValue(errors["Unknown error"]);
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
      clearUserFromStorage();
    },
    setLanguage: (state, action: { payload: "English" | "Urdu" }) => {
      state.userInfo!.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle initialize user
    builder.addCase(initializeUser.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      console.log("initialized user, got", action.payload);
      if (action.payload.isGuest === true && action.payload.userInfo) {
        state.isGuest = true;
        state.userInfo = action.payload.userInfo;
        console.log("Initialized guest", state);
      } else if (
        action.payload.username &&
        action.payload.token &&
        action.payload.userInfo
      ) {
        state.username = action.payload.username || null;
        state.token = action.payload.token || null;
        state.userInfo = action.payload.userInfo || null;

        console.log("Initialized user", state);
      }
    });
    builder.addCase(initializeUser.rejected, (state, action) => {
      console.log(
        "Failed to initialize user",
        getErrorFromCode(action.payload as tError)
      );
    });

    // Handle login

    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.token = action.payload.token;

      if (typeof action.payload.userInfo === "object") {
        state.userInfo = action.payload.userInfo;
      }
    });
    builder.addCase(login.rejected, (state, action) => {});

    builder.addCase(createAccount.fulfilled, (state) => {});
    builder.addCase(createAccount.rejected, (state, action) => {});

    builder.addCase(continueAsGuest.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.isGuest = true;
      state.userInfo = action.payload;
    });
    builder.addCase(continueAsGuest.rejected, (state, action) => {});
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
