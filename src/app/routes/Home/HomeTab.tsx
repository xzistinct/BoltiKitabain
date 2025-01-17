import {
  View,
  Text,
  StyleProp,
  TextStyle,
  useWindowDimensions,
} from "react-native";

import font from "@/constants/fonts";

import Shelf from "./Shelf";
import { book } from "@/constants/types";

type tBookShelf = {
  books: book[] | null;
  title: string;
  behaviour: "Open" | "Modal";
  emptyMessage: string;
}[];

export default function HomeTab() {
  const { width, height } = useWindowDimensions();

  const renderBookShelf = (item: tBookShelf[0], index: number) => {
    const ShelfHeaderStyle: StyleProp<TextStyle> = {
      color: "black",
      fontSize: 3.2 * (height / 100),
      marginLeft: 4 * (width / 100),
      fontFamily: font("Jost", "Regular"),
    };
    return (
      <View key={index} style={{ marginTop: 5 * (height / 100) }}>
        <Text style={ShelfHeaderStyle}>{item.title}</Text>
        <Shelf
          books={item.books}
          emptyMessage={item.emptyMessage}
          behaviour={item.behaviour}
        />
      </View>
    );
  };

  const bookShelf: tBookShelf = [
    {
      books: null,
      title: "Currently reading",
      behaviour: "Open",
      emptyMessage: "Start reading to fill this shelf",
    },
    {
      books: null,
      title: "In your reading list",
      behaviour: "Open",
      emptyMessage: "Add to your reading list to fill this shelf",
    },
  ];

  return (
    <View>{bookShelf.map((item, index) => renderBookShelf(item, index))}</View>
  );
}
