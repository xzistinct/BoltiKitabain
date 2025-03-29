import { book } from "@/constants/types";
import {
  TouchableOpacity,
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

import { SecondsToTime } from "@/helpers/SecondsToTime";

import { VERYLIGHTGREY, BABYBLUE } from "@/constants/colors";

import Chip from "./Chip";

import font from "@/constants/fonts";

export default function BookCard({
  book,
  onPress,
}: {
  book: book;
  onPress: () => void;
}) {
  const { width, height } = useWindowDimensions();
  const bookLength = SecondsToTime(book.length || 0);

  return (
    <TouchableOpacity
      onPress={onPress}
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
            <TouchableWithoutFeedback onPress={onPress}>
              <View style={{}}>
                <Text
                  style={{
                    color: BABYBLUE,
                    fontFamily: font("Jost", "Regular"),
                    fontSize: 2.75 * (height / 100),
                  }}
                >
                  {book.name}
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
            width: "90%",
            height: "100%",
          }}
        >
          <ScrollView horizontal>
            <TouchableWithoutFeedback>
              <Text>{book.description}</Text>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </View>
    </TouchableOpacity>
  );
}
