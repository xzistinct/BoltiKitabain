import { Text, TouchableOpacity, useWindowDimensions } from "react-native";

import AngleRight from "./angleRight";

import { BABYBLUE } from "@/constants/colors";

export default function ArrowButton({
  handleNext,
  content,
  font,
}: {
  handleNext: () => void;
  content: string;
  font: string;
}) {
  const { width, height } = useWindowDimensions();
  <TouchableOpacity
    style={{
      backgroundColor: BABYBLUE,
      width: 35 * (width / 100),
      height: 6.5 * (height / 100),
      borderRadius: 15,
      position: "absolute",
      bottom: 10 * (height / 100),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    }}
    onPress={handleNext}
  >
    <Text
      style={{
        fontFamily: "Jost_400Regular",
        color: "white",
        position: "relative",
        right: 10,
        fontSize: 25,
      }}
    >
      {content}
    </Text>
    <AngleRight
      color={"white"}
      style={{ position: "absolute", right: 10, width: 20, height: 20 }}
    />
  </TouchableOpacity>;
}
