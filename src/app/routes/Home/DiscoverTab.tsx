import { useState } from "react";

import { genres } from "@/constants/bookGenres";
import { tGenres, book } from "@/constants/types";
import {
  View,
  Text,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
  FlatList,
  Modal,
  StyleSheet,
} from "react-native";
import font from "@/constants/fonts";

import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { getBooksInGenre } from "@/helpers/GetBooks";
import {
  BABYBLUE,
  DARKERGREY,
  LIGHTERGREY,
  VERYLIGHTGREY,
} from "@/constants/colors";

import { Dropdown } from "react-native-element-dropdown";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import BookModal from "@/components/BookModal";

const Filter = () => {
  const { width, height } = useWindowDimensions();
  const sortByValues = [
    "Newest",
    "Oldest",
    "Most Popular",
    "Least Popular",
  ] as const;

  const [value, setValue] =
    useState<(typeof sortByValues)[number]>("Most Popular");

  const styles = StyleSheet.create({});
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 5 * (height / 100),
        paddingHorizontal: 5 * (width / 100),
        marginBottom: 2 * (height / 100),
        justifyContent: "space-around",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: font("Jost", "Regular"),
            fontSize: 2.5 * (height / 100),
          }}
        >
          Sort by{" "}
        </Text>
        <Dropdown
          style={{
            margin: 16,
            height: 4 * (height / 100),
            width: 35 * (width / 100),
            borderBottomColor: "gray",
            borderBottomWidth: 0.5,
          }}
          selectedTextStyle={{ fontFamily: font("Jost", "Regular") }}
          itemTextStyle={{ fontFamily: font("Jost", "Regular") }}
          containerStyle={{ borderRadius: 10 }}
          itemContainerStyle={{ paddingVertical: 0 }}
          data={sortByValues.map((item) => {
            return { label: item, value: item };
          })}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          value={value}
          onChange={(item) => {
            setValue(item.value);
          }}
        />
      </View>
      <View>
        <FontAwesome name="filter" size={3 * (height / 100)} color="black" />
      </View>
    </View>
  );
};

export default function DiscoverTab() {
  const { width, height } = useWindowDimensions();
  const [currentGenre, setCurrentGenre] = useState<tGenres>(genres[0]);

  const [booksInSelectedGenre, setBooksInSelectedGenre] = useState<
    book[] | null
  >(getBooksInGenre(currentGenre, 10));

  const CarouselStyle: StyleProp<ViewStyle> = {
    width: 85 * (width / 100),
    height: 10 * (height / 100),
    marginHorizontal: "auto",
  };
  const renderBook = (item: book, index: number) => {
    console.log(index);
    return (
      <View
        key={item.name + item.id}
        style={{
          width: 85 * (width / 100),
          height: 11 * (height / 100),
          backgroundColor: VERYLIGHTGREY,
          marginHorizontal: "auto",
          marginBottom: 2 * (height / 100),
          borderRadius: 4 * (width / 100),
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 3 * (width / 100),
          paddingVertical: 2 * (height / 100),
        }}
      >
        <View>
          <Text
            style={{
              color: BABYBLUE,
              fontFamily: font("Jost", "Regular"),
              fontSize: 2.75 * (height / 100),
            }}
          >
            {item.name}
          </Text>
          <Text style={{ color: DARKERGREY }}>{item.author}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View>
        <View>
          <Carousel
            data={Array.from(genres)}
            windowSize={1}
            onSnapToItem={(index) => {
              setCurrentGenre(genres[index]);
              setBooksInSelectedGenre(getBooksInGenre(genres[index], 15));
            }}
            //@ts-ignore
            height={CarouselStyle.height}
            loop={true}
            snapEnabled={true}
            //@ts-ignore
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
      <View>
        <Filter />
      </View>
      <View>
        {booksInSelectedGenre !== null && booksInSelectedGenre.map(renderBook)}
      </View>
      <BookModal />
    </View>
  );
}
