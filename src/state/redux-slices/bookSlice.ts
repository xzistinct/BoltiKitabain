import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { book, tError, tResponse } from "@/constants/types";
import { endpoints } from "@/helpers/endpoints";
import { errors, getErrorFromCode } from "@/constants/errors";

// Define types
interface BookProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  lastReadAt: string;
}

interface Bookmark {
  id: string;
  bookId: string;
  page: number;
  note?: string;
  createdAt: string;
}

interface BookState {
  currentlyReading: string[]; // Array of book IDs
  bookProgress: Record<string, BookProgress>; // Map of bookId to progress
  bookmarks: Bookmark[];
  fetchedPopularBooks: book[];
  fetchedByGenre: { genre: string; books: book[] };
}

// Initial state
const initialState: BookState = {
  currentlyReading: [],
  bookProgress: {},
  bookmarks: [],
  fetchedPopularBooks: [],
  fetchedByGenre: { genre: "", books: [] },
};

// Async thunks
export const fetchCurrentlyReading = createAsyncThunk(
  "book/fetchCurrentlyReading",
  async (_, { rejectWithValue }) => {
    try {
      const jsonValue = await AsyncStorage.getItem("currentlyReading");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchBookProgress = createAsyncThunk(
  "book/fetchBookProgress",
  async (_, { rejectWithValue }) => {
    try {
      const jsonValue = await AsyncStorage.getItem("bookProgress");
      return jsonValue != null ? JSON.parse(jsonValue) : {};
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchReadingList = createAsyncThunk(
  "book/fetchReadingList",
  async (_, { rejectWithValue }) => {}
);

export const fetchBookmarks = createAsyncThunk(
  "book/fetchBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const jsonValue = await AsyncStorage.getItem("bookmarks");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchPopularBooks = createAsyncThunk(
  "book/fetchPopularBooks",
  async (
    { callback }: { callback: (books: tResponse) => void },
    { rejectWithValue }: { rejectWithValue: (err: tError) => void }
  ): Promise<void | book[]> => {
    try {
      const response = await fetch(endpoints.books);
      if (!response.ok) {
        return rejectWithValue(errors["Failed to get books"]);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        return rejectWithValue(errors["Failed to get books"]);
      }
      let books: book[] = data.map((book: any) => {
        return {
          name: book["title"],
          name_urdu: book["titleUrdu"],
          image: book["image"],
          description: book["description"],
          id: book["_id"],
          author: book["author"],
          genre: book["genre"],
          narrator: book["narrator"],
        } as book;
      });
      callback({ success: true });
      return books;
    } catch (error) {
      console.error("Error fetching popular books:", error);
      callback({ success: false, error: errors["Unknown error"] });
      return rejectWithValue(errors["Unknown error"]);
    }
  }
);

// Create slice
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    // Additional reducers for updating state can be added here
    addToCurrentlyReading: (state, action: PayloadAction<string>) => {
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
    updateBookProgress: (state, action: PayloadAction<BookProgress>) => {
      state.bookProgress[action.payload.bookId] = action.payload;
      // Save to AsyncStorage
      AsyncStorage.setItem(
        "bookProgress",
        JSON.stringify(state.bookProgress)
      ).catch((error) => console.error("Error saving book progress:", error));
    },
    addBookmark: (state, action: PayloadAction<Bookmark>) => {
      state.bookmarks.push(action.payload);
      // Save to AsyncStorage
      AsyncStorage.setItem("bookmarks", JSON.stringify(state.bookmarks)).catch(
        (error) => console.error("Error saving bookmarks:", error)
      );
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.id !== action.payload
      );
      // Save to AsyncStorage
      AsyncStorage.setItem("bookmarks", JSON.stringify(state.bookmarks)).catch(
        (error) => console.error("Error saving bookmarks:", error)
      );
    },
  },
  extraReducers: (builder) => {
    // Handle currently reading list fetch
    builder
      .addCase(fetchCurrentlyReading.pending, (state) => {})
      .addCase(fetchCurrentlyReading.fulfilled, (state, action) => {})
      .addCase(fetchCurrentlyReading.rejected, (state, action) => {});

    // Handle book progress fetch
    builder
      .addCase(fetchBookProgress.pending, (state) => {})
      .addCase(fetchBookProgress.fulfilled, (state, action) => {})
      .addCase(fetchBookProgress.rejected, (state, action) => {});

    // Handle bookmarks fetch
    builder
      .addCase(fetchBookmarks.pending, (state) => {})
      .addCase(fetchBookmarks.fulfilled, (state, action) => {})
      .addCase(fetchBookmarks.rejected, (state, action) => {});
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
          getErrorFromCode(action.payload as tError)
        );
      });
  },
});

// Export actions and reducer
export const {
  addToCurrentlyReading,
  updateBookProgress,
  addBookmark,
  removeBookmark,
} = bookSlice.actions;
export default bookSlice.reducer;
