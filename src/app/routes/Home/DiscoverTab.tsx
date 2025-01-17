import { useState } from "react";

import { genres } from "@/constants/bookGenres";
import { tGenres, book } from "@/constants/types";
import {
  View,
  Text,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
import font from "@/constants/fonts";

import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";

export default function DiscoverTab() {
  const { width, height } = useWindowDimensions();
  const [currentGenre, setCurrentGenre] = useState<tGenres>(genres[0]);

  const [booksInSelectedGenre, setBooksInSelectedGenre] = useState<
    book[] | null
  >();

  const CarouselStyle: StyleProp<ViewStyle> = {
    width: 85 * (width / 100),
    height: 10 * (height / 100),
    marginHorizontal: "auto",
  };

  const progress = useSharedValue<number>(0);

  return (
    <View>
      <View>
        <View>
          <Carousel
            data={Array.from(genres)}
            windowSize={1}
            height={CarouselStyle.height}
            loop={true}
            snapEnabled={true}
            width={CarouselStyle.width}
            style={CarouselStyle}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 50 * (width / 100),
              parallaxAdjacentItemScale: 0.5,
            }}
            renderItem={({ item, index }) => (
              <View style={{ display: "flex", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 7 * (height / 100),
                    fontFamily: font("Jost", "Regular"),

                    backgroundColor: "white",
                  }}
                >
                  {item}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
      <View></View>
    </View>
  );
}
