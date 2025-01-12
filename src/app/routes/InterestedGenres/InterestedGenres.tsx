import {
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import React, { useState } from "react";

import Constants from "expo-constants";

import { useNavigation } from "@react-navigation/native";
import { BABYBLUE, GREY } from "@/constants/colors";

import AngleRight from "@/components/angleRight";
import { ONBOARDINGNEXTCSS } from "@/constants/styles";
import ArrowButton from "@/components/ArrowButton";
import { SafeAreaView } from "react-native-safe-area-context";

export const genres = [
  "Sci-fi",
  "Historical",
  "Poetry",
  "Fantasy",
  "Self help",
  "Action",
  "Romantic",
  "Horror",
  "Memoir",
  "Narrative",
  "Thriller",
  "Novel",
  "Drama",
  "Humor",
  "Adventure",
  "Dystopian",
  "Mystery",
  "Short stories",
  "Young adult",
  "Indie",
  "Crime",
  "Informative",
] as const;

export default function InterestedGenres() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const [err, setErr] = useState<string | null>(null);

  const [selectedGenres, setSelectedGenres] = useState<
    Array<(typeof genres)[number]>
  >([]);

  const handleNext = () => {
    if (selectedGenres.length === 0) {
      setErr("Please select at least one genre");
      return;
    }
    //@ts-ignore
    navigation.navigate("RecommendedBook");
  };

  return (
    <SafeAreaView
      style={{
        width: width,
        height: height,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <>
        <Text
          style={{
            fontFamily: "Jost-SemiBold",
            fontSize: 11.5 * (width / 100),
            marginTop: 10 * (height / 100),
            marginLeft: 10 * (width / 100),
            lineHeight: 12.75 * (width / 100),
          }}
        >
          Which genres interest you?
        </Text>
        <Text
          style={{
            width: 65 * (width / 100),
            marginLeft: 10 * (width / 100),
            fontSize: 15,
          }}
        >
          Help us recommend audiobooks you'll enjoy
        </Text>
      </>

      <View
        style={{ height: 40 * (height / 100), marginTop: 4 * (height / 100) }}
      >
        {err && (
          <Text
            style={{
              textAlign: "center",
              color: "red",
              fontSize: 15,
              position: "absolute",
              top: -2 * (height / 100),
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
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontFamily: "Jost-Medium",
                }}
              >
                {genre}
              </Text>
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
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontFamily: "Jost-Medium",
                      }}
                    >
                      {genre}
                    </Text>
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
      />
    </SafeAreaView>
  );
}
