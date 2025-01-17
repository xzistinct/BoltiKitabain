import { useState } from "react";

import { genres } from "@/constants/bookGenres";
import { tGenres, book } from "@/constants/types";
import { View, Text, useWindowDimensions } from "react-native";
import font from "@/constants/fonts";

export default function DiscoverTab() {
  const { width, height } = useWindowDimensions();
  const [currentGenre, setCurrentGenre] = useState<tGenres>(genres[0]);

  const [booksInSelectedGenre, setBooksInSelectedGenre] = useState<
    book[] | null
  >();

  return (
    <View>
      <View>
        <View>
          <Text
            style={{
              fontSize: 5 * (height / 100),
              fontFamily: font("Jost", "Regular"),
            }}
          >
            {currentGenre}
          </Text>
        </View>
      </View>
      <View></View>
    </View>
  );
}
