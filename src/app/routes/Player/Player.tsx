import {
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useCallback, useEffect, useRef, useState } from "react";
import { BarIndicator } from "react-native-indicators";

import { book } from "@/constants/types";
import {
  getAudioURL,
  getBookById,
  getBookChapters,
  getImageURL,
} from "@/helpers/books";
import font from "@/constants/fonts";
import {
  BABYBLUE,
  DARKERGREY,
  DARKGREY,
  GREY,
  LIGHTGREY,
  NAVYBLUE,
  VERYLIGHTGREY,
} from "@/constants/colors";

import Slider from "react-native-slider";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";

import { PrettyPrintSeconds, SecondsToTime } from "@/helpers/time";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useAppDispatch, useAppSelector } from "@/state/reduxStore";

import BookImage, { imageRatio } from "@/components/BookImage";
import Chip from "@/components/Chip";
import { endpoints } from "@/constants/endpoints";

import {
  useAudioPlayer,
  setAudioModeAsync,
  useAudioPlayerStatus,
} from "expo-audio";

import {
  addToCurrentlyReading,
  updateBookProgress,
} from "@/state/redux-slices/bookSlice";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

function LoadedPlayer({ book }: { book: book }) {
  if (!book || !book.chapters || book.chapters.length === 0) {
    return <></>;
  }
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const bookProgress = useAppSelector(
    (state) => state.books.bookProgress[book.id || ""]
  );

  let audioSource = {
    uri: getAudioURL(
      book?.chapters[bookProgress?.currentChapter || 0].audio_id
    ),
  };

  let audioPlayer = useAudioPlayer(audioSource, 250);
  const AudioPlayerStatus = useAudioPlayerStatus(audioPlayer);

  const sliderTouchableRef = useRef<View>(null);

  const loadChapterToTrack = (chapterNumber: number) => {
    if (!book.chapters || !book.chapters[chapterNumber] || !audioPlayer) {
      return;
    }
    audioPlayer.replace({
      uri: getAudioURL(book?.chapters[chapterNumber].audio_id),
    });
    dispatch(
      updateBookProgress({
        bookId: book.id || "",
        currentChapter: chapterNumber,
        currentProgressSeconds: 0,
      })
    );
  };

  const saveBookProgress = (currentTime: number | null) => {
    if (!currentTime) return;
    console.log("Saving progress", currentTime);
    dispatch(
      updateBookProgress({
        bookId: book.id || "",
        currentChapter: bookProgress?.currentChapter || 0,
        currentProgressSeconds: currentTime,
      })
    );
  };

  useEffect(() => {
    setAudioModeAsync({
      shouldPlayInBackground: true,
    });
    if (!bookProgress) {
      dispatch(
        updateBookProgress({
          bookId: book.id || "",
          currentChapter: 0,
          currentProgressSeconds: 0,
        })
      );
    }
    if (!book.chapters) {
      console.error("No chapters found for this book.");
      return;
    }
    loadChapterToTrack(bookProgress?.currentChapter || 0);
    // Start playing it
    audioPlayer.play();
    console.log("Progress", bookProgress?.currentProgressSeconds);
    if (bookProgress?.currentProgressSeconds) {
      audioPlayer.seekTo(bookProgress.currentProgressSeconds);
    }

    setTimeout(() => {
      dispatch(addToCurrentlyReading(book.id || ""));
    }, 5000);
    const saveProgressInterval = setInterval(
      () => saveBookProgress(AudioPlayerStatus?.currentTime || null),
      5000
    );

    return () => {
      clearInterval(saveProgressInterval);
    };
  }, []);

  useEffect(() => {
    if (AudioPlayerStatus?.playbackState === "ended") {
      console.log("ended");
      loadChapterToTrack(bookProgress?.currentChapter + 1 || 0);
    }
  }, [AudioPlayerStatus.playbackState]);

  return (
    <View style={{ paddingTop: height * 0.05 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: height * 0.05,
        }}
      >
        <TouchableOpacity
          style={{ marginLeft: width * 0.075 }}
          onPress={() => navigation.goBack()}
        >
          <Entypo
            name="chevron-small-left"
            size={width * 0.125}
            color="black"
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: font("Jost", "Regular"),
            fontSize: 22,

            maxWidth: width * 0.7,
            marginLeft: width * 0.005,
          }}
        >
          {book.name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginLeft: width * 0.15,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontFamily: font("Jost", "Regular") }}>
          {book.author}
        </Text>
        <FlatList
          data={book.genre}
          horizontal={true}
          contentContainerStyle={{
            width: width * 0.45,
            marginLeft: width * 0.05,
          }}
          renderItem={(item) => (
            <Chip
              content={item.item}
              textStyle={{}}
              style={{
                marginLeft: 2 * (width / 100),
              }}
            />
          )}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: height * 0.1,
          justifyContent: "center",
        }}
      >
        {book.chapters && (
          <View
            style={{
              width: width * 0.4,

              height: (width * 0.5) / imageRatio,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: font("OpenSans", "Regular"),
                fontSize: 20,
              }}
            >
              Chapters
            </Text>
            <View style={{ height: "90%" }}>
              <FlatList
                data={book.chapters}
                persistentScrollbar={true}
                contentContainerStyle={{
                  paddingBottom: 20,
                }}
                nestedScrollEnabled={true}
                renderItem={(item) => (
                  <TouchableOpacity
                    onPress={() => {
                      loadChapterToTrack(item.index);
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: font("OpenSans", "Regular"),
                        fontSize: 15,
                        marginVertical: height * 0.0075,
                        color: NAVYBLUE,
                        backgroundColor:
                          bookProgress?.currentChapter === item.index
                            ? VERYLIGHTGREY
                            : "white",
                        marginHorizontal: width * 0.01,
                        borderRadius: 5,
                      }}
                    >
                      {item.item.name}
                    </Text>
                    <View
                      style={{
                        width: "50%",
                        borderBottomWidth: 1,
                        marginHorizontal: "auto",
                        borderColor: LIGHTGREY,
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        )}
        <View style={{ alignItems: "center" }}>
          <BookImage id={book.image} width={width * 0.5} />
        </View>
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
          <TouchableWithoutFeedback
            onPress={(event) => {
              const { locationX } = event.nativeEvent;
              sliderTouchableRef.current?.measure(
                (x, y, width, height, pageX, pageY) => {
                  const position = (locationX / width) * audioPlayer.duration;
                  audioPlayer.seekTo(position);
                }
              );
            }}
          >
            <View ref={sliderTouchableRef}>
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
                value={AudioPlayerStatus.currentTime}
                maximumValue={AudioPlayerStatus.duration}
                onValueChange={(value: number) => {
                  audioPlayer.seekTo(value);
                  console.log("changed");
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 0,
            marginTop: -10, // Added negative margin to reduce vertical space
          }}
        >
          <Text style={{ color: DARKERGREY, fontSize: 13 }}>
            {PrettyPrintSeconds(AudioPlayerStatus.currentTime)}
          </Text>
          <Text style={{ color: DARKERGREY, fontSize: 13 }}>
            {PrettyPrintSeconds(AudioPlayerStatus.duration)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: height * 0.05,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <Ionicons name="play-skip-back" size={45} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (audioPlayer.playing) {
                audioPlayer.pause();
              } else {
                audioPlayer.play();
              }
            }}
            style={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 0.05 * width,
            }}
          >
            {audioPlayer.playing ? (
              <Fontisto name="pause" size={40} color="black" />
            ) : (
              <Entypo name="controller-play" size={55} color="black" />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="play-skip-forward" size={45} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
    </View>
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
        let chapters = await getBookChapters(book.id || "", jwt || "");
        if (typeof chapters === "object") {
          book.chapters = chapters.chapters;
          book.numberOfChapters = chapters.num;
        }
        setBook(book);
      }

      setScreenState("loaded");
    })();
  }, []);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {book !== null && <LoadedPlayer book={book} />}
      {screenState === "loading" && <LoadingOverlay />}
    </View>
  );
}
