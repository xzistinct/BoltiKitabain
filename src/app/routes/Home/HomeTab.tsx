import {
  View,
  Text,
  StyleProp,
  TextStyle,
  useWindowDimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

import font from "@/constants/fonts";

import Shelf from "./Shelf";
import { book } from "@/constants/types";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useAppDispatch, useAppSelector } from "@/state/reduxStore";
import {
  fetchPopularBooks,
  removeFromReadingList,
} from "@/state/redux-slices/bookSlice";
import { getBookById } from "@/helpers/books";
import { useSelector } from "react-redux";

type tBookShelf = {
  books: book[] | null;
  title: string;
  behaviour: "Open" | "Modal";
  emptyMessage: string;
  onLongPress?: (book: book) => void;
}[];

export default function HomeTab() {
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const popularBooks = useAppSelector(
    (state) => state.books.fetchedPopularBooks
  );
  const readingList = useAppSelector((state) => state.books.readingList);
  const currentlyReading = useAppSelector(
    (state) => state.books.currentlyReading
  );
  const jwt = useAppSelector((state) => state.user.token);

  const [screenState, setScreenState] = useState<
    "loading" | "loaded" | "error"
  >("loading");

  useEffect(() => {
    (async () => {
      // Fetch data
      dispatch(
        fetchPopularBooks({
          callback: (books) => {
            if (books.success) {
              setScreenState("loaded");
            } else {
              setScreenState("error");
            }
          },
        })
      );
    })();
  }, []);

  const [readingListBooks, setReadingListBooks] = useState<book[] | null>(null);
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState<
    book[] | null
  >(null);

  useEffect(() => {
    (async () => {
      let books: book[] = [];
      for (let book of readingList) {
        let bookData = await getBookById(book, jwt || "");

        if (typeof bookData === "object") {
          books.push(bookData);
        }
      }
      if (books.length === 0 && readingList.length > 0) {
        return;
      }
      setReadingListBooks(books);
    })();
  }, [readingList]);

  useEffect(() => {}, [currentlyReading]);

  const renderBookShelf = (item: tBookShelf[0], index: number) => {
    const ShelfHeaderStyle: StyleProp<TextStyle> = {
      color: "black",
      fontSize: 3.2 * (height / 100),
      marginLeft: 4 * (width / 100),
      marginBottom: 1.5 * (height / 100),
      fontFamily: font("Jost", "Regular"),
    };
    return (
      <View
        key={index}
        style={{ marginTop: index === 0 ? 0 : 5 * (height / 100) }}
      >
        <Text style={ShelfHeaderStyle}>{item.title}</Text>
        <Shelf
          books={item.books}
          emptyMessage={item.emptyMessage}
          behaviour={item.behaviour}
          onLongPress={item.onLongPress}
        />
      </View>
    );
  };

  const bookShelf: tBookShelf = [
    {
      books: currentlyReadingBooks,
      title: "Currently reading",
      behaviour: "Open",
      emptyMessage: "Start reading to fill this shelf",
    },
    {
      books: readingListBooks,
      title: "In your reading list",
      behaviour: "Open",
      emptyMessage: "Add to your reading list to fill this shelf",
      onLongPress: (book) => {
        dispatch(removeFromReadingList(book.id || ""));
      },
    },
    {
      books: popularBooks,
      title: "Popular",
      behaviour: "Modal",
      emptyMessage: "No popular books found",
    },
  ];

  return (
    <>
      <ScrollView
        nestedScrollEnabled={true}
        removeClippedSubviews={true}
        contentContainerStyle={{
          paddingBottom: 20 * (height / 100), // Add sufficient bottom padding
        }}
      >
        <TouchableWithoutFeedback>
          <View>
            {bookShelf.map((item, index) => renderBookShelf(item, index))}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      {screenState === "loading" && <LoadingOverlay />}
    </>
  );
}
