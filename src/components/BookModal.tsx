import { bookImageRatio } from "@/constants/books";
import { BABYBLUE, GREY } from "@/constants/colors";
import font from "@/constants/fonts";
import { getBooksInGenre } from "@/helpers/GetBooks";
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

  const actionButtonStyle: StyleProp<ViewStyle> = {
    backgroundColor: BABYBLUE,
    width: 45 * (width / 100),
    height: 8.5 * (height / 100),
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

  const bookLength = SecondsToTime(book.length);

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
              height: 57.5 * (height / 100),
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
              <View style={{ width: 40 * (width / 100) }}>
                <ScrollView horizontal style={{}}>
                  <TouchableHighlight>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      {book.tags.map((tag, index) => (
                        <Chip
                          content={tag}
                          key={index}
                          textStyle={{}}
                          style={{ marginLeft: 2 * (width / 100) }}
                        />
                      ))}
                    </View>
                  </TouchableHighlight>
                </ScrollView>
              </View>
              <Stars stars={book.rating} size={4.5 * (width / 100)} />
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 2 * (height / 100),
                width: width,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  marginLeft: 4 * (width / 100),
                  width: 40 * (width / 100),
                  height: 40 * bookImageRatio * (width / 100),
                  backgroundColor: GREY,
                }}
              ></View>
              <ScrollView
                style={{
                  marginLeft: 5 * (width / 100),
                  marginRight: 3 * (width / 100),
                  height: 37.5 * bookImageRatio * (width / 100),
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
              <TouchableOpacity style={actionButtonStyle}>
                <Text style={actionButtonTextStyle}>Start reading</Text>
              </TouchableOpacity>
              <TouchableOpacity style={actionButtonStyle}>
                <Text style={actionButtonTextStyle}>Add to reading list</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
