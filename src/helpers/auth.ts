import AsyncStorage from "@react-native-async-storage/async-storage";

import { tError, tUser, tUserInformation, tUserPrefs } from "@/constants/types";
import { errors } from "@/constants/errors";

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
    error?: tError;
  } = { success: false, token: null };

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
  response.error = errors["Invalid credentials"];
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
  };

  //fetch locally stored data

  if (!auth) {
    console.log("no auth");
  }

  return data;
};

export const createUserAccount = async (
  user: tUser & tUserInformation
): Promise<{ success: boolean; message?: string }> => {
  if (!user.username || !user.password) {
    return { success: false, message: "Invalid credentials" };
  }
  testAuth.push({
    username: user.username,
    password: user.password,
  });
  return { success: true };
};

// function getUserInformationOnline(token: string): Promise<tUserInformation> {
//   const data: tUserInformation = {name: "John Doe", dob: "01/01/2000", gender
//   }
//   return data
// }
