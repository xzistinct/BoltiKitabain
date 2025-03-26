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
  name?: string;
  dob?: tDate;
  gender?: "Male" | "Female" | null;
  language?: "English" | "Urdu";
};

export type tUserPrefs = {
  currentlyReadingList: string[];
  readingList: string[];
  interestedGenres: string[];
  bookProgress: { [key: string]: number };
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
  chapters?: Array<{ name: string; length: number }>;
  dateAdded?: tDate;
};

export type tBookSortBy = (typeof bookSortBy)[number];

export type tError = (typeof errors)[keyof typeof errors];
export type tResponse = {
  success: boolean;
  error?: tError;
};
