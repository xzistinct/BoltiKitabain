import { Text, useWindowDimensions, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import { BarIndicator } from "react-native-indicators";

import { book } from "@/constants/types";
import { getBookById } from "@/helpers/GetBooks";
import font from "@/constants/fonts";
import { BABYBLUE, GREY, LIGHTGREY } from "@/constants/colors";

function LoadedPlayer({ book }: { book: book }) {
  const { width, height } = useWindowDimensions();
  return (
    <>
      <View style={{ marginLeft: width * 0.075, marginTop: height * 0.05 }}>
        <Entypo name="chevron-small-left" size={width * 0.125} color="black" />
      </View>
      <View>
        <Text
          style={{
            fontFamily: font("Jost", "Regular"),
            fontSize: 30,
            textAlign: "center",
            width: width * 0.8,
            marginHorizontal: "auto",
          }}
        >
          {book.name}
        </Text>
      </View>
      <View style={{ marginTop: height * 0.075, alignItems: "center" }}>
        <View
          style={{
            width: width * 0.7,
            height: height * 0.4,
            backgroundColor: LIGHTGREY,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{ marginTop: height * 0.2, alignItems: "center" }}></View>
    </>
  );
}

export default function Player({ route }: any) {
  const bookId = route.params.bookId;
  const { width, height } = useWindowDimensions();

  let [book, setBook] = useState<book | null>(null);

  const [screenState, setScreenState] = useState<
    "loading" | "error" | "loaded"
  >("loaded");

  useEffect(() => {
    (async () => {
      setBook(await getBookById(bookId));
      setScreenState("loaded");
    })();
  });
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {screenState === "loaded" && book !== null && (
        <LoadedPlayer book={book} />
      )}
      {screenState === "loading" && (
        <>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <BarIndicator count={5} />
          </View>
        </>
      )}
    </View>
  );
}
