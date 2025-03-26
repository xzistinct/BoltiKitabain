import AsyncStorage from "@react-native-async-storage/async-storage";

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
}> => {
  const response: {
    success: boolean;
    token: null | string;
    error?: tError;
  } = { success: false, token: null };

  console.log(
    "Attempting to login with username:",
    username,
    " password:",
    password
  );

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

    const data = await response.json();

    console.log("Data received from server:", data);

    if (data.token) {
      const name =
        JSON.parse(atob(data.token.split(".")[1]))["first_name"] +
        " " +
        JSON.parse(atob(data.token.split(".")[1]))["last_name"];
      await AsyncStorage.setItem("auth_token", data.token);
      console.log("user name is", name);
      //@ts-ignore
      await storeUserInformation({ name: name, gender: "Male" });
      return {
        success: true,
        token: data.token,
      };
    }
  } catch (e) {
    console.error("Error while logging in:");
  }

  response.error = errors["Invalid credentials"];
  response.success = false;
  return response;
};

export const createUserAccount = async (
  user: tUser,
  userInformation: tUserInformation
): Promise<tResponse> => {
  if (!user.username || !user.password) {
    return { success: false, error: errors["Invalid credentials"] };
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

    const data = await response.json();

    if (response.status === 400 && data.includes("already exist")) {
      return { success: false, error: errors["Email already registered"] };
    } else if (!response.ok) {
      console.log("Error while creating account:", data);
      return { success: false, error: errors["Unknown error"] };
    }

    console.log("Data received from server:", data);

    return storeUserInformation(userInformation);
  } catch (e) {
    console.error("Error while creating account:", e);
    return { success: false, error: errors["Unknown error"] };
  }
};

export const getUserInformation = async (): Promise<
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

const storeUserInformation = async (
  userInformation: tUserInformation
): Promise<tResponse> => {
  const stored = await getUserInformation();
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
