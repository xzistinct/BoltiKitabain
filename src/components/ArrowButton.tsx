import {
  StyleProp,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
} from "react-native";

import AngleRight from "./angleRight";

import { BABYBLUE } from "@/constants/colors";

export default function ArrowButton({
  onPress,
  content,
  font,
  style,
}: {
  onPress: () => void;
  content: string;
  font: string;
  style: StyleProp<ViewStyle>;
}) {
  const { width, height } = useWindowDimensions();
  return (
    <TouchableOpacity style={style} onPress={onPress}>
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
    </TouchableOpacity>
  );
}
