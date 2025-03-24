import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  loginAttemptMessage,
  tUserInformation,
  tUserPrefs,
} from "@/constants/types";

let testAuth: { username: string; password: string }[] = [
  { username: "3090606808", password: "admin123" },
];

let testAuthCheck = (username: string, password: string) => {
  return testAuth.find(
    (user) => user.username === username && user.password === password
  );
};

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

  if (testAuthCheck(username, password)) {
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
  const data: tUserInformation & tUserPrefs = {
    name: null,
    dob: null,
    gender: null,
    currentlyReadingList: [],
    readingList: [],
    interestedGenres: [],
    username: "",
  };

  //fetch locally stored data

  if (!auth) {
    console.log("no auth");
  }

  return data;
};

export const createUserAccount = async (
  userInformation: tUserInformation
): Promise<{ success: boolean; message?: string }> => {
  if (!userInformation.username || !userInformation.password) {
    return { success: false, message: "Invalid credentials" };
  }
  testAuth.push({
    username: userInformation.username,
    password: userInformation.password,
  });
  return { success: true };
};

// function getUserInformationOnline(token: string): Promise<tUserInformation> {
//   const data: tUserInformation = {name: "John Doe", dob: "01/01/2000", gender
//   }
//   return data
// }
