import React, { useEffect, useRef, useState } from "react";

import { tGenres, book } from "@/constants/types";
import {
  View,
  Text,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import font from "@/constants/fonts";

import { FlatList } from "react-native-gesture-handler";

import Carousel from "react-native-reanimated-carousel";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import BookModal from "@/components/BookModal";

import BookCard from "@/components/BookCard";
import { useAppSelector } from "@/state/reduxStore";
import { getBookCategories, getBooksByCategory } from "@/helpers/books";
import { BarIndicator } from "react-native-indicators";
import { BABYBLUE } from "@/constants/colors";

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
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [booksInCurrentCategory, setBooksInCurrentCategory] = useState<
    book[] | null
  >([]);
  const jwt = useAppSelector((state) => state.user.token);
  const booksByCategoryRef = useRef<Record<string, book[]>>({});

  useEffect(() => {
    (async () => {
      const categoriesGotten = await getBookCategories();
      if (typeof categoriesGotten === "number") {
        return;
      }
      setCategories(categoriesGotten);
      setCurrentCategory(categoriesGotten[0]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!booksByCategoryRef.current[currentCategory]) {
        const books = await getBooksByCategory(currentCategory, jwt || "");
        if (typeof books === "number") {
          return;
        }
        booksByCategoryRef.current[currentCategory] = books;
      }
      setBooksInCurrentCategory(booksByCategoryRef.current[currentCategory]);
    })();
  }, [currentCategory]);

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
            windowSize={3}
            onSnapToItem={(index) => {
              console.log("Snapped");
              setCurrentCategory(categories[index]);
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
              <View
                style={{
                  display: "flex",
                  height: CarouselStyle.height,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  borderRadius: 10,
                  alignSelf: "center",
                  paddingHorizontal: 4,
                  paddingVertical: 10,
                  width: "auto",
                  flexGrow: 0,
                  flexShrink: 1,
                }}
              >
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    fontSize: 5 * (height / 100),
                    fontFamily: font("Jost", "Regular"),
                    textAlign: "center",
                    maxWidth: "90%",
                  }}
                >
                  {item}
                </Text>
              </View>
            )}
          />
        </View>
        {booksInCurrentCategory && booksInCurrentCategory.length > 0 ? (
          <FlatList
            data={booksInCurrentCategory}
            removeClippedSubviews={true}
            renderItem={(item) => {
              return (
                <BookCard
                  book={item.item}
                  onPress={() => {
                    console.log("Pressed", item.item.name);
                    setSelectedBook(item.item);
                    setModalVisible(true);
                  }}
                />
              );
            }}
          />
        ) : (
          <View
            style={{
              height: height - (CarouselStyle.height as number) - 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BarIndicator color={BABYBLUE} />
          </View>
        )}
      </View>
      <BookModal
        book={selectedBook}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </>
  );
}
