import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  loading: {
    currentlyReading: boolean;
    bookProgress: boolean;
    bookmarks: boolean;
  };
  error: {
    currentlyReading: string | null;
    bookProgress: string | null;
    bookmarks: string | null;
  };
}

// Initial state
const initialState: BookState = {
  currentlyReading: [],
  bookProgress: {},
  bookmarks: [],
  loading: {
    currentlyReading: false,
    bookProgress: false,
    bookmarks: false,
  },
  error: {
    currentlyReading: null,
    bookProgress: null,
    bookmarks: null,
  },
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
      .addCase(fetchCurrentlyReading.pending, (state) => {
        state.loading.currentlyReading = true;
        state.error.currentlyReading = null;
      })
      .addCase(fetchCurrentlyReading.fulfilled, (state, action) => {
        state.loading.currentlyReading = false;
        state.currentlyReading = action.payload;
      })
      .addCase(fetchCurrentlyReading.rejected, (state, action) => {
        state.loading.currentlyReading = false;
        state.error.currentlyReading = action.payload as string;
      });

    // Handle book progress fetch
    builder
      .addCase(fetchBookProgress.pending, (state) => {
        state.loading.bookProgress = true;
        state.error.bookProgress = null;
      })
      .addCase(fetchBookProgress.fulfilled, (state, action) => {
        state.loading.bookProgress = false;
        state.bookProgress = action.payload;
      })
      .addCase(fetchBookProgress.rejected, (state, action) => {
        state.loading.bookProgress = false;
        state.error.bookProgress = action.payload as string;
      });

    // Handle bookmarks fetch
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading.bookmarks = true;
        state.error.bookmarks = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading.bookmarks = false;
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading.bookmarks = false;
        state.error.bookmarks = action.payload as string;
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
