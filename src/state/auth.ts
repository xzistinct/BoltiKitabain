import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginAttemptMessage, tUserInformation } from "@/constants/types";

export const login = async (username: string, password: string) => {
  const response: {
    success: boolean;
    token: null | string;
    message: loginAttemptMessage;
  } = { success: false, token: null, message: "success" };

  console.log(
    "Attempting to login with username:",
    username,
    " password:",
    password
  );

  await new Promise((r) => setTimeout(r, 2000));

  if (username === "3090606808" && password === "admin123") {
    response.success = true;
    response.token = "token";
    return response;
  }
  response.message = "Invalid credentials";
  response.success = false;
  return response;
};

export const getUserInformation = async (
  auth: string | null
): Promise<tUserInformation> => {
  const data: tUserInformation = {
    name: null,
    dob: null,
    gender: null,
    currentlyReadingList: [],
    readingList: [],
    interestedGenres: [],
  };

  //fetch locally stored data

  if (!auth) {
    console.log("no auth");
  }

  return data;
};

// function getUserInformationOnline(token: string): Promise<tUserInformation> {
//   const data: tUserInformation = {name: "John Doe", dob: "01/01/2000", gender
//   }
//   return data
// }
