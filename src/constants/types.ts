import { bookSortBy, genres } from "./books";

export type tDate = {
  day: number;
  month: number;
  year: number;
};

export type loginAttemptMessage =
  | "success"
  | "Invalid credentials"
  | "unknown error";

export type tUserInformation = {
  name: string | null;
  dob: tDate | null;
  gender: boolean | null;
  username: string | null;
  password?: string;
};

export type tUserPrefs = {
  currentlyReadingList: Array<string> | null;
  readingList: Array<string> | null;
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

export type tBookSortBy = (typeof bookSortBy)[number];
