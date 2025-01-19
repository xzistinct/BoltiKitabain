import React, { useState } from "react";

import { genres } from "@/constants/books";
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
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import { SecondsToTime } from "@/helpers/SecondsToTime";
import Chip from "@/components/Chip";

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

export default function DiscoverTab({}: {}) {
  const { width, height } = useWindowDimensions();
  const [currentGenre, setCurrentGenre] = useState<tGenres>(genres[0]);

  const [booksInSelectedGenre, setBooksInSelectedGenre] = useState<
    book[] | null
  >(getBooksInGenre(currentGenre, 10));

  const [selectedBook, setSelectedBook] = useState<book | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const CarouselStyle: StyleProp<ViewStyle> = {
    width: 85 * (width / 100),
    height: 10 * (height / 100),
    marginHorizontal: "auto",
  };
  const renderBook = (item: book, index: number) => {
    const bookLength = SecondsToTime(item.length);

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedBook(item);
          setModalVisible(true);
        }}
        key={index}
        style={{
          width: 85 * (width / 100),
          height: 11 * (height / 100),
          backgroundColor: VERYLIGHTGREY,
          marginHorizontal: "auto",
          marginBottom: 2 * (height / 100),
          borderRadius: 2 * (width / 100),

          paddingHorizontal: 4 * (width / 100),
          paddingVertical: 1 * (height / 100),
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "50%",
          }}
        >
          <View style={{ width: "100%", height: "100%" }}>
            <ScrollView horizontal>
              <TouchableWithoutFeedback>
                <View style={{}}>
                  <Text
                    style={{
                      color: BABYBLUE,
                      fontFamily: font("Jost", "Regular"),
                      fontSize: 2.75 * (height / 100),
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            height: "50%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: 55 * (width / 100),
              height: "100%",
            }}
          >
            <ScrollView horizontal>
              <TouchableWithoutFeedback>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  {item.tags.map((tag, index) => (
                    <Chip
                      content={tag}
                      key={index}
                      textStyle={{}}
                      style={{
                        marginLeft: 2 * (width / 100),
                        paddingVertical: 0.3 * (height / 100),
                      }}
                    />
                  ))}
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
          <Text
            style={{
              fontFamily: font("Jost", "Regular"),
              fontSize: 2.2 * (height / 100),
            }}
          >
            {" "}
            {("0" + bookLength.hours).slice(-2)}:
            {("0" + bookLength.minutes).slice(-2)}:
            {("0" + bookLength.seconds).slice(-2)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={{ width: width }}>
        <View style={{ height: CarouselStyle.height }}>
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
        <View>
          <Filter />
        </View>
        <View>
          {booksInSelectedGenre !== null &&
            booksInSelectedGenre.map(renderBook)}
        </View>
      </View>
    </>
  );
}
