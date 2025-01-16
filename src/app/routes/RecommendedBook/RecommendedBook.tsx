import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { GREY, BABYBLUE } from "@/constants/colors";
import font from "@/constants/fonts";
import { SCREENHEADER } from "@/constants/styles";

export default function RecommendedBook() {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,

        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={SCREENHEADER.textStyle(width, height)}>
        Heres a book we think you'll enjoy
      </Text>

      <View>
        <View
          style={{
            marginTop: 5 * (height / 100),
            width: (height > 700 ? 60 : 50) * (width / 100),
            height: (height > 700 ? 45 : 37.5) * (height / 100),
            backgroundColor: GREY,
            borderRadius: 5,
          }}
        ></View>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 10 * (height / 100),
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: 70 * (width / 100),
        }}
      >
        <TouchableOpacity>
          <Text
            style={{
              color: GREY,
              fontSize: 20,
              fontFamily: font("Jost", "Medium"),
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: BABYBLUE,
            width: 35 * (width / 100),
            minWidth: 150,
            paddingHorizontal: 4 * (width / 100),
            paddingVertical: 1 * (height / 100),

            borderRadius: 15,

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontFamily: font("Jost", "Medium"),
              textAlign: "center",
            }}
          >
            Add to reading list
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
