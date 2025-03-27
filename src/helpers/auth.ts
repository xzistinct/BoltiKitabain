import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

import {
  tError,
  tResponse,
  tUser,
  tUserInformation,
  tUserPrefs,
} from "@/constants/types";
import { errors } from "@/constants/errors";
import { endpoints } from "./endpoints";

export const login = async (
  username: string,
  password: string
): Promise<{
  success: boolean;
  token: null | string;
  error?: tError;
  userInformation?: tUserInformation;
}> => {
  const loginResponse: {
    success: boolean;
    token: null | string;
    error?: tError;
  } = { success: false, token: null };

  try {
    const response = await fetch(endpoints.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    });

    const text = await response.text();

    if (text === "Password incorrect") {
      loginResponse.error = errors["Invalid credentials"];
      loginResponse.success = false;
      return loginResponse;
    }
    if (text === "This email is not registered") {
      loginResponse.error = errors["Email not registered"];
      loginResponse.success = false;
      return loginResponse;
    }
    const data = await JSON.parse(text);

    if (data.token) {
      const name =
        JSON.parse(atob(data.token.split(".")[1]))["first_name"] +
        " " +
        JSON.parse(atob(data.token.split(".")[1]))["last_name"];

      return {
        success: true,
        token: data.token,
        userInformation: { name, gender: "Male" },
      };
    }
  } catch (e) {
    console.error("Error while logging in:", e);
    return { token: null, success: false, error: errors["Unknown error"] };
  }

  loginResponse.error = errors["Unknown error"];
  loginResponse.success = false;
  return loginResponse;
};

export const createUserAccount = async (
  user: tUser,
  userInformation: tUserInformation
): Promise<tResponse> => {
  if (!user.username || !user.password || !userInformation.name) {
    return { success: false, error: errors["Insufficient information"] };
  }

  try {
    const response = await fetch(endpoints.register, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.username,
        password: user.password,
        first_name: userInformation.name?.split(" ")[0] || "",
        last_name: userInformation.name?.split(" ")[1] || "",
      }),
    });

    const text = await response.text();

    if (response.status === 400 && text.includes("already exist")) {
      return { success: false, error: errors["Email already registered"] };
    } else if (!response.ok) {
      return { success: false, error: errors["Unknown error"] };
    }

    const data = await JSON.parse(text);

    if (data.email) {
      return { success: true };
    }
  } catch (e) {
    return { success: false, error: errors["Unknown error"] };
  }
  return { success: false, error: errors["Unknown error"] };
};

export const getCredentialsFromStorage = async (): Promise<
  { username: string; password: string } | tError | "IsGuest"
> => {
  if ((await AsyncStorage.getItem("IsGuest")) === "true") {
    return "IsGuest";
  }

  let username: string | null;
  let password: string | null;

  try {
    username = await SecureStore.getItemAsync("username");
    password = await SecureStore.getItemAsync("password");
  } catch (e) {
    console.error("Error while getting credentials from storage:", e);
    return errors["Unknown error"];
  }

  if (!username || !password) {
    console.log("Got username:", username, "Got password:", password);
    return errors["Failed to get credentials from storage"];
  }

  return { username, password };
};

export const setCredentialsInStorage = async (
  username: string,
  password: string
): Promise<tResponse> => {
  console.log("Setting credentials:", username, password);
  try {
    await SecureStore.setItemAsync("username", username);
    await SecureStore.setItemAsync("password", password);
    return { success: true };
  } catch (e) {
    console.error("Error while storing credentials:", e);
    return { success: false, error: errors["Failed to store credentials"] };
  }
};

export const getUserInformationFromStorage = async (): Promise<
  tUserInformation | tError
> => {
  let userInformation: tUserInformation | null;

  try {
    userInformation = JSON.parse(
      (await AsyncStorage.getItem("userInformation")) || "null"
    );
  } catch (e) {
    console.error("Error while getting user information:", e);
    return errors["Unknown error"];
  }

  if (!userInformation) {
    return errors["Unknown error"];
  }

  return userInformation;
};

export const setUserInformationInStorage = async (
  userInformation: tUserInformation
): Promise<tResponse> => {
  const stored = await getUserInformationFromStorage();
  try {
    await AsyncStorage.setItem(
      "userInformation",
      JSON.stringify(
        typeof stored === "object"
          ? { ...stored, ...userInformation }
          : userInformation
      )
    );
    return { success: true };
  } catch (e) {
    console.error("Error while storing user information:", e);
    return { success: false, error: errors["Unknown error"] };
  }
};

export const clearUserFromStorage = async (): Promise<tResponse> => {
  try {
    await AsyncStorage.removeItem("userInformation");
    await AsyncStorage.removeItem("IsGuest");
    await SecureStore.deleteItemAsync("username");
    await SecureStore.deleteItemAsync("password");
    return { success: true };
  } catch (e) {
    console.error("Error while clearing user from storage:", e);
    return { success: false, error: errors["Unknown error"] };
  }
};
