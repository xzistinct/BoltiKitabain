import {
  StyleProp,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
} from "react-native";

import AngleRight from "./AngleRight";

import { BABYBLUE } from "@/constants/colors";

export default function ArrowButton({
  onPress,
  content,
  font,
  style,
  arrowSize,
  textSize,
  textColor,
}: {
  onPress: () => void;
  content?: string;
  font?: string | undefined;
  style: StyleProp<ViewStyle>;
  arrowSize: number;
  textSize?: number;
  textColor?: string;
}) {
  const { width, height } = useWindowDimensions();
  return (
    <TouchableOpacity
      style={{
        //@ts-ignore
        ...style,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontFamily: font,
          color: textColor,
          position: "relative",
          right: 10,
          fontSize: textSize,
        }}
      >
        {content}
      </Text>
      <AngleRight
        color={"white"}
        style={
          content
            ? {
                position: "absolute",
                right: 10,
                width: arrowSize,
                height: arrowSize,
              }
            : { width: arrowSize, height: arrowSize, marginHorizontal: "auto" }
        }
      />
    </TouchableOpacity>
  );
}
