import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";
import { BarIndicator } from "react-native-indicators";

import { book } from "@/constants/types";
import { getBookById } from "@/helpers/books";
import font from "@/constants/fonts";
import {
  BABYBLUE,
  DARKERGREY,
  DARKGREY,
  GREY,
  LIGHTGREY,
} from "@/constants/colors";

import Slider from "react-native-slider";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";

import { SecondsToTime } from "@/helpers/SecondsToTime";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useAppSelector } from "@/state/reduxStore";

import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from "react-native-track-player";

function LoadedPlayer({ book }: { book: book }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const jwt = useAppSelector((state) => state.user.token);

  useEffect(() => {
    (async () => {
      // Set up the player
      await TrackPlayer.setupPlayer();

      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        notificationCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });

      // Add a track to the queue
      await TrackPlayer.add({
        id: "trackId",
        url: "https://boltikitabain.pk:8443/audios/1635697397819GK%20class%201%20chapter%201.mp3",
        title: "Track Title",
        artist: "Track Artist",
      });

      // Start playing it
      await TrackPlayer.play();
    })();
  }, []);

  const [sliderValue, setSliderValue] = useState<number>(0);
  return (
    <>
      <TouchableOpacity
        style={{ marginLeft: width * 0.075, marginTop: height * 0.05 }}
        onPress={() => navigation.goBack()}
      >
        <Entypo name="chevron-small-left" size={width * 0.125} color="black" />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            fontFamily: font("Jost", "Regular"),
            fontSize: 30,
            textAlign: "center",
            width: width * 0.8,
            marginHorizontal: "auto",
          }}
        >
          {book.name}
        </Text>
      </View>
      <View style={{ marginTop: height * 0.075, alignItems: "center" }}>
        <View
          style={{
            width: width * 0.7,
            height: height * 0.35,
            backgroundColor: LIGHTGREY,
            borderRadius: 10,
          }}
        />
      </View>
      <View
        style={{
          marginTop: height * 0.05,
          width: width * 0.7,
          marginHorizontal: "auto",
          borderColor: "black",
        }}
      >
        <View>
          <Slider
            minimumTrackTintColor={BABYBLUE}
            maximumTrackTintColor="white"
            style={{}}
            trackStyle={{
              height: 10,
              borderRadius: 100,
              width: width * 0.7,
              borderColor: BABYBLUE,
              borderWidth: 1,
            }}
            thumbTintColor={LIGHTGREY}
            value={sliderValue}
            onValueChange={(value: number) => setSliderValue(value)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 0,
            marginTop: -10, // Added negative margin to reduce vertical space
          }}
        >
          <Text style={{ color: DARKERGREY, fontSize: 13 }}>0:00</Text>
          <Text style={{ color: DARKERGREY, fontSize: 13 }}>
            {SecondsToTime(book.length || 0).hours > 0 &&
              SecondsToTime(book.length || 0).hours + ":"}
            {SecondsToTime(book.length || 0).minutes}:
            {SecondsToTime(book.length || 0).seconds}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",

            marginTop: height * 0.05,
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="play-skip-back"
            size={45}
            color="black"
            style={{ marginRight: width * 0.075 }}
          />
          <Fontisto
            name="pause"
            size={45}
            color="black"
            style={{ marginRight: width * 0.075 }}
          />
          <Ionicons name="play-skip-forward" size={45} color="black" />
        </View>
      </View>
      <View></View>
    </>
  );
}

export default function Player({ route }: any) {
  const bookId = route.params.bookId;
  const { width, height } = useWindowDimensions();
  const jwt = useAppSelector((state) => state.user.token);

  let [book, setBook] = useState<book | null>(null);

  const [screenState, setScreenState] = useState<
    "loading" | "error" | "loaded"
  >("loading");

  useEffect(() => {
    (async () => {
      let book = await getBookById(bookId, jwt || "");
      if (typeof book === "object") {
        setBook(book);
      }
      setScreenState("loaded");
    })();
  });
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {screenState === "loaded" && book !== null && (
        <LoadedPlayer book={book} />
      )}
      {screenState === "loading" && <LoadingOverlay />}
    </View>
  );
}
