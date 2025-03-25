import { bookSortBy, genres } from "./books";
import { errors } from "./errors";

export type tDate = {
  day: number | null;
  month: number | null;
  year: number | null;
};

export type tUser = {
  username: string | null;
  password?: string;
  token: string | null;
  type: "guest" | "user";
};

export type tUserInformation = {
  name: string | null;
  dob: tDate | null;
  gender: boolean | null;
};

export type tUserPrefs = {
  currentlyReadingList: Array<string> | null;
  readingList: Array<string> | null;
  interestedGenres: Array<tGenres>;
};

export type tGenres = (typeof genres)[number];

export type book = {
  name: string;
  image: string;
  author: string;
  genre: string;
  rating: number;
  length: number;
  description: string;
  id: string;
  url: string;
  tags: string[];
};

export type tBookSortBy = (typeof bookSortBy)[number];

export type tError = (typeof errors)[keyof typeof errors];
export type tResponse = {
  success: boolean;
  error?: tError;
};
