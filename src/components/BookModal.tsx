import { BABYBLUE, GREY } from "@/constants/colors";
import font from "@/constants/fonts";
import { SecondsToTime } from "@/helpers/SecondsToTime";
import React, { act, useEffect, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

import { book } from "@/constants/types";

import Modal from "react-native-modal";
import Chip from "./Chip";
import Stars from "./Stars";
import { useNavigation } from "@react-navigation/native";
import BookImage from "./BookImage";
import { useAppDispatch } from "@/state/reduxStore";
import { addToReadingList } from "@/state/redux-slices/bookSlice";

export default function BookModal({
  book,
  modalVisible,
  setModalVisible,
}: {
  book: book | null;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const startReading = () => {
    setModalVisible(false);
    //@ts-ignore
    navigation.navigate("Player", { bookId: book.id });
  };

  const actionButtonStyle: StyleProp<ViewStyle> = {
    backgroundColor: BABYBLUE,
    width: 40 * (width / 100),
    height: 7.5 * (height / 100),
    paddingHorizontal: 3 * (width / 100),
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
  };

  const actionButtonTextStyle: StyleProp<TextStyle> = {
    fontSize: 2.8 * (height / 100),

    fontFamily: font("Jost", "Regular"),

    color: "white",
    textAlign: "center",
  };

  if (!book || !modalVisible) return null;

  const showTopBar = book.length || book.tags || book.genre || book.rating;

  const bookLength = book.length
    ? SecondsToTime(book.length)
    : SecondsToTime(0);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Modal
        isVisible={modalVisible}
        animationIn={"slideInUp"}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating
        backdropOpacity={0.1}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        swipeDirection="down"
        onSwipeComplete={(e) => {
          setModalVisible(false);
        }}
        style={{
          justifyContent: "flex-end", // Aligns the modal at the bottom
          margin: 0, // Removes default margin around the modal
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: width,
              height: showTopBar
                ? 55.5 * (height / 100)
                : 47.5 * (height / 100),
              maxHeight: 60 * (height / 100),
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}
          >
            <View
              style={{
                width: 30 * (width / 100),
                height: 6,
                marginTop: 1.5 * (height / 100),
                marginHorizontal: "auto",
                borderRadius: 100,
                backgroundColor: GREY,
              }}
            />
            {showTopBar && (
              <View
                style={{
                  marginTop: 3 * (height / 100),
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: 90 * (width / 100),
                  marginHorizontal: "auto",
                }}
              >
                {book.length ? (
                  <Text
                    style={{
                      fontSize: 4.5 * (width / 100),
                      fontFamily: font("Jost", "Regular"),
                    }}
                  >
                    {("0" + bookLength.hours).slice(-2)}:
                    {("0" + bookLength.minutes).slice(-2)}:
                    {("0" + bookLength.seconds).slice(-2)}
                  </Text>
                ) : (
                  <Text
                    style={{
                      width: 0.5 * width,
                      fontSize: 4 * (width / 100),

                      fontFamily: font("OpenSans", "Regular"),
                    }}
                  >
                    {book.name}
                  </Text>
                )}
                <View style={{ width: 40 * (width / 100) }}>
                  <ScrollView horizontal style={{}}>
                    <TouchableHighlight>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        {(book.tags || book.genre) &&
                          [book.tags || [], book.genre]
                            .flat()
                            .map((tag, index) => (
                              <Chip
                                content={tag || ""}
                                key={index}
                                textStyle={{}}
                                style={{ marginLeft: 2 * (width / 100) }}
                              />
                            ))}
                      </View>
                    </TouchableHighlight>
                  </ScrollView>
                </View>
                {book.rating && (
                  <Stars stars={book.rating} size={4.5 * (width / 100)} />
                )}
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                marginTop: 2 * (height / 100),
                width: width,
                alignItems: "center",
              }}
            >
              <BookImage
                id={book.image}
                width={0.425 * width}
                containerStyle={{ marginLeft: 4 * (width / 100) }}
              />
              <ScrollView
                style={{
                  marginLeft: 5 * (width / 100),
                  marginRight: 3 * (width / 100),
                  height: 22.5 * (height / 100),
                }}
              >
                <TouchableHighlight>
                  <Text
                    style={{
                      fontSize: 4 * (width / 100),
                      lineHeight: 4 * (width / 100) + 2,
                      fontFamily: font("OpenSans", "Regular"),
                    }}
                  >
                    {book.description}
                  </Text>
                </TouchableHighlight>
              </ScrollView>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 4 * (height / 100),
                width: width,
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={actionButtonStyle}
                onPress={startReading}
              >
                <Text style={actionButtonTextStyle}>Start listening</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={actionButtonStyle}
                onPress={() => {
                  dispatch(addToReadingList(book.id || ""));
                }}
              >
                <Text style={actionButtonTextStyle}>Add to list</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
