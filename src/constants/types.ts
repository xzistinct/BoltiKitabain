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

export type tGenres = string;

export type chapter = {
  name: string;
  tags?: string[];
  name_urdu?: string;
  audio_id: string;
  id?: string;
};

export type book = {
  name?: string;
  name_urdu?: string;
  image?: string;
  author?: string;
  genre?: string[];
  rating?: number;
  length?: number;
  description?: string;
  contributor?: string;
  id?: string;
  tags?: string[];
  chapters?: chapter[];
  numberOfChapters?: number;
  dateAdded?: tDate;
  narrator?: string;
};

export interface BookProgress {
  bookId: string;
  currentChapter: number;
  currentProgressSeconds: number;
}

export type BookProgresses = Record<string, BookProgress>;

export interface Bookmark {
  bookId: string;
  chapter: number;
  note?: string;
  timeStamp: number;
}

export type Bookmarks = Record<string, Bookmark[]>;

export type tError = (typeof errors)[keyof typeof errors];
export type tResponse = {
  success: boolean;
  error?: tError;
};
