import React, { useEffect, useState } from "react";

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

import FontAwesome from "@expo/vector-icons/FontAwesome";
import BookModal from "@/components/BookModal";

import BookCard from "@/components/BookCard";
import { useAppSelector } from "@/state/reduxStore";
import { getBookCategories } from "@/helpers/books";

const Filter = () => {
  const { width, height } = useWindowDimensions();

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
      </View>
      <View>
        <FontAwesome name="filter" size={3 * (height / 100)} color="black" />
      </View>
    </View>
  );
};

export default function DiscoverTab({}: {}) {
  const { width, height } = useWindowDimensions();
  const [categories, setCategories] = useState<string[]>([]);
  const [currentGenre, setCurrentGenre] = useState<string>("");

  useEffect(() => {
    (async () => {
      const categoriesGotten = await getBookCategories();
      if (typeof categoriesGotten === "number") {
        return;
      }
      setCategories(categoriesGotten);
    })();
  }, []);

  const [selectedBook, setSelectedBook] = useState<book | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const CarouselStyle: StyleProp<ViewStyle> = {
    width: 85 * (width / 100),
    height: 10 * (height / 100),
    marginHorizontal: "auto",
  };

  return (
    <>
      <View style={{ width: width }}>
        <View style={{ height: CarouselStyle.height }}>
          <Carousel
            data={categories}
            windowSize={1}
            // onSnapToItem={(index) => {
            //   setCurrentGenre(categories[index]);
            // }}
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
          {/* {booksInSelectedGenre !== null &&
            booksInSelectedGenre.map((item, index) => (
              <BookCard
                key={index}
                book={item}
                onPress={() => {
                  setSelectedBook(item);
                  setModalVisible(true);
                }}
              />
            ))} */}
        </View>
      </View>
      <BookModal
        book={selectedBook}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </>
  );
}
