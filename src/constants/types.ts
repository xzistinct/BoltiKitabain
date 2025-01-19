import { genres } from "./books";

export type loginAttemptMessage =
  | "success"
  | "Invalid credentials"
  | "unknown error";

export type tUserInformation = {
  name: string | null;
  dob: string | null;
  gender: boolean | null;
  currentlyReadingList: Array<string>;
  readingList: Array<string>;
  interestedGenres: Array<tGenres>;
};

export type tGenres = (typeof genres)[number];

export type dispatchLoginAttempMessage =
  | loginAttemptMessage
  | "failed to store credentials";

export type book = {
  name: string;
  image: string;
  author: string;
  genre: string;
  rating: number;
  length: number;
  description: string;
  id: string;
  tags: string[];
};
