import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  book,
  Bookmark,
  Bookmarks,
  BookProgress,
  BookProgresses,
  tError,
  tResponse,
} from "@/constants/types";
import { endpoints } from "@/constants/endpoints";
import { errors, getErrorFromCode } from "@/constants/errors";
import { getPopularBooks } from "@/helpers/books";

// Define types

interface BookState {
  currentlyReading: string[]; // Array of book IDs
  bookProgress: BookProgresses; // Map of bookId to progress
  bookmarks: Bookmarks;
  fetchedPopularBooks: book[];
  fetchedByGenre: Record<string, book[]>;
  readingList: string[];
  initialized: boolean;
}

// Initial state
const initialState: BookState = {
  readingList: [],
  currentlyReading: [],
  bookProgress: {},
  bookmarks: {},
  fetchedPopularBooks: [],
  fetchedByGenre: {},
  initialized: false,
};

// Async thunks

export const initializeBookState = createAsyncThunk(
  "book/initializeBookState",
  async (
    callback: (response: tResponse) => void,
    { rejectWithValue }: { rejectWithValue: (err: tError) => void }
  ): Promise<void | {
    currentlyReading: string[];
    bookProgress: BookProgresses;
    bookmarks: Bookmarks;
    readingList: string[];
  }> => {
    try {
      const currentlyReading = await AsyncStorage.getItem("currentlyReading");
      const bookProgress = await AsyncStorage.getItem("bookProgress");
      const bookmarks = await AsyncStorage.getItem("bookmarks");
      const readingList = await AsyncStorage.getItem("readingList");
      callback({ success: true });
      return {
        currentlyReading: currentlyReading ? JSON.parse(currentlyReading) : [],
        bookProgress: bookProgress ? JSON.parse(bookProgress) : {},
        bookmarks: bookmarks ? JSON.parse(bookmarks) : {},
        readingList: readingList ? JSON.parse(readingList) : [],
      };
    } catch (error) {
      console.error("Error initializing book state:", error);
      callback({
        success: false,
        error: "Failed to initialize book state",
      });
      return rejectWithValue("Failed to initialize book state");
    }
  }
);

export const fetchPopularBooks = createAsyncThunk(
  "book/fetchPopularBooks",
  async (
    { callback }: { callback: (books: tResponse) => void },
    {
      getState,
      rejectWithValue,
    }: {
      getState: () => any;
      rejectWithValue: (err: tError) => void;
    }
  ): Promise<void | book[]> => {
    // Get current state and check if popular books already exist
    const state = getState().books as BookState;
    if (!state.initialized) {
      callback({
        success: false,
        error: "Redux state not initialized",
      });
      return rejectWithValue("Redux state not initialized");
    }
    if (state.fetchedPopularBooks.length > 0) {
      console.log("Already fetched popular books");
      callback({
        success: false,
        error:"Data already exists",
      });
      return rejectWithValue(
        "Data already exists");
    }
    try {
      const books = await getPopularBooks();
      if (typeof books === "string") {
        callback({ success: false, error: books });
        return rejectWithValue(books);
      }
      callback({ success: true });
      return books;
    } catch (error) {
      console.error("Error fetching popular books:", error);
      callback({ success: false, error: "Unknown error" });
      return rejectWithValue("Unknown error");
    }
  }
);

// Create slice
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    // Additional reducers for updating state can be added here
    clearBookData: (state) => {
      state.bookProgress = {};
      state.bookmarks = {};
      state.currentlyReading = [];
      state.readingList = [];

      state.fetchedPopularBooks = [];

      console.log(state.readingList);

      AsyncStorage.removeItem("currentlyReading");
      AsyncStorage.removeItem("bookProgress");
      AsyncStorage.removeItem("bookmarks");
      AsyncStorage.removeItem("readingList");
    },
    addToCurrentlyReading: (state, action: PayloadAction<string>) => {
      if (!state.initialized) {
        return;
      }
      if (!state.currentlyReading.includes(action.payload)) {
        state.currentlyReading.push(action.payload);
        // Save to AsyncStorage
        AsyncStorage.setItem(
          "currentlyReading",
          JSON.stringify(state.currentlyReading)
        ).catch((error) =>
          console.error("Error saving currently reading:", error)
        );
      }
    },
    addToReadingList: (state, action: PayloadAction<string>) => {
      if (!state.initialized) {
        return;
      }
      if (!Array.from(state.readingList).includes(action.payload)) {
        state.readingList = [...Array.from(state.readingList), action.payload];

        // Save to AsyncStorage
        AsyncStorage.setItem(
          "readingList",
          JSON.stringify(state.readingList)
        ).catch((error) => console.error("Error saving reading list:", error));
      }
    },
    removeFromReadingList: (state, action: PayloadAction<string>) => {
      if (!state.initialized) {
        return;
      }
      state.readingList = Array.from(state.readingList).filter(
        (bookId) => bookId !== action.payload
      );
      AsyncStorage.setItem("readingList", JSON.stringify(state.readingList));
    },
    removeFromCurrentlyReading: (state, action: PayloadAction<string>) => {
      if (!state.initialized) return;

      state.currentlyReading = state.currentlyReading.filter(
        (bookId) => bookId !== action.payload
      );
      // Save to AsyncStorage
      AsyncStorage.setItem(
        "currentlyReading",
        JSON.stringify(state.currentlyReading)
      ).catch((error) =>
        console.error("Error saving currently reading:", error)
      );
    },
    updateBookProgress: (state, action: PayloadAction<BookProgress>) => {
      if (!state.initialized) {
        return;
      }
      state.bookProgress[action.payload.bookId] = action.payload;
      // Save to AsyncStorage
      AsyncStorage.setItem(
        "bookProgress",
        JSON.stringify(state.bookProgress)
      ).catch((error) => console.error("Error saving book progress:", error));
    },
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      if (!state.initialized) {
        return;
      }
      if (!state.bookmarks[action.payload.bookId][action.payload.chapter]) {
        state.bookmarks[action.payload.bookId][action.payload.chapter] = [];
      }
      state.bookmarks[action.payload.bookId][action.payload.chapter].push(
        action.payload
      );
      // Save to AsyncStorage
      AsyncStorage.setItem("bookmarks", JSON.stringify(state.bookmarks)).catch(
        (error) => console.error("Error saving bookmarks:", error)
      );
    },
    removeBookmark: (state, action: PayloadAction<Bookmark>) => {
      if (!state.initialized) {
        return;
      }
      if (!state.bookmarks[action.payload.bookId]) {
        return;
      }
      if (!state.bookmarks[action.payload.bookId][action.payload.chapter]) {
        return;
      }
      state.bookmarks[action.payload.bookId][action.payload.chapter] =
        state.bookmarks[action.payload.bookId][action.payload.chapter].filter(
          (bookmark) => bookmark.timeStamp !== action.payload.timeStamp
        );
      // Save to AsyncStorage
      AsyncStorage.setItem("bookmarks", JSON.stringify(state.bookmarks)).catch(
        (error) => console.error("Error saving bookmarks:", error)
      );
    },
    initializeBookmark: (state, action: PayloadAction<string>) => {
      if (!state.initialized) {
        return;
      }
      if (!state.bookmarks[action.payload]) {
        state.bookmarks[action.payload] = {};
      }
    },
  },
  extraReducers: (builder) => {
    // Initialize book state
    builder
      .addCase(initializeBookState.pending, () => {})
      .addCase(initializeBookState.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        state.readingList = action.payload.readingList;
        state.currentlyReading = action.payload.currentlyReading;
        state.bookProgress = action.payload.bookProgress;
        state.bookmarks = action.payload.bookmarks;
        state.initialized = true;
      });

    // Handle popular books fetch
    builder
      .addCase(fetchPopularBooks.pending, (state) => {})
      .addCase(fetchPopularBooks.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.fetchedPopularBooks = action.payload;
      })
      .addCase(fetchPopularBooks.rejected, (state, action) => {
        console.log(
          "action.payload of fetching books",
          action.payload,
        );
      });
  },
});

// Export actions and reducer
export const {
  addToCurrentlyReading,
  removeFromReadingList,
  removeFromCurrentlyReading,
  addToReadingList,
  updateBookProgress,
  addBookmark,
  removeBookmark,
  clearBookData,
  initializeBookmark,
} = bookSlice.actions;
export default bookSlice.reducer;
