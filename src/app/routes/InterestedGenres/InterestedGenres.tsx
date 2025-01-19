import {
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleProp,
  TextStyle,
} from "react-native";

import React, { useState } from "react";

import Constants from "expo-constants";

import { useNavigation } from "@react-navigation/native";
import { BABYBLUE, GREY } from "@/constants/colors";

import { ONBOARDINGNEXTCSS, SCREENHEADER } from "@/constants/styles";
import ArrowButton from "@/components/ArrowButton";
import font from "@/constants/fonts";

import { genres } from "@/constants/books";
import { tGenres } from "@/constants/types";

export default function InterestedGenres() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const [err, setErr] = useState<string | null>(null);

  const [selectedGenres, setSelectedGenres] = useState<Array<tGenres | null>>(
    []
  );

  const handleNext = () => {
    if (selectedGenres.length === 0) {
      setErr("Please select at least one genre");
      return;
    }
    //@ts-ignore
    navigation.navigate("RecommendedBook");
  };

  const genreTextStyle: StyleProp<TextStyle> = {
    color: "white",
    fontSize: 3 * (height / 100),
    fontFamily: font("Jost", "Regular"),
  };

  return (
    <View
      style={{
        width: width,
        height: height,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ marginLeft: 10 * (width / 100) }}>
        <Text style={SCREENHEADER.textStyle(width, height)}>
          Which genres interest you?
        </Text>
        <Text
          style={{
            width: 65 * (width / 100),

            fontSize: 15,
          }}
        >
          Help us recommend audiobooks you'll enjoy
        </Text>
      </View>

      <View
        style={{
          height: (height > 700 ? 45 : 37.5) * (height / 100),

          marginTop: 4 * (height / 100),
        }}
      >
        {err && (
          <Text
            style={{
              textAlign: "center",
              color: "red",
              fontSize: 15,
              position: "absolute",
              top: -2 * (height / 100),
              width: width,
            }}
          >
            {err}
          </Text>
        )}
        <ScrollView
          persistentScrollbar={true}
          scrollEnabled={true}
          style={{ marginTop: 2 * (height / 100) }}
          contentContainerStyle={{
            paddingBottom: 5 * (height / 100),
            marginLeft: 7.5 * (width / 100),
            rowGap: 10,
            display: "flex",
            alignItems: "baseline",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {selectedGenres.sort().map((genre, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setErr(null);
                setSelectedGenres((l) => l.filter((item) => item !== genre));
              }}
              style={{
                backgroundColor: BABYBLUE,
                marginRight: 3 * (width / 100),
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              <Text style={genreTextStyle}>{genre}</Text>
            </TouchableOpacity>
          ))}
          {Array.from(genres)
            .sort()
            .map(
              (genre, i) =>
                !selectedGenres.includes(genre) && (
                  <TouchableOpacity
                    key={i}
                    onPress={() =>
                      setSelectedGenres([...selectedGenres, genre])
                    }
                    style={{
                      backgroundColor: GREY,
                      marginRight: 3 * (width / 100),
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={genreTextStyle}>{genre}</Text>
                  </TouchableOpacity>
                )
            )}
        </ScrollView>
      </View>
      <ArrowButton
        content="Next"
        onPress={handleNext}
        font={ONBOARDINGNEXTCSS.font}
        style={ONBOARDINGNEXTCSS.style(width, height)}
        arrowSize={ONBOARDINGNEXTCSS.arrowSize}
        textSize={ONBOARDINGNEXTCSS.fontSize}
        textColor={ONBOARDINGNEXTCSS.textColor}
      />
    </View>
  );
}
