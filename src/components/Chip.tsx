import {
  View,
  Text,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

import { LIGHTGREY, DARKGREY, LIGHTERGREY } from "@/constants/colors";
import font from "@/constants/fonts";

export default function Chip({
  content,
  style = {},
  textStyle = {},
}: {
  content: string;
  style: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
}) {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        backgroundColor: LIGHTERGREY,
        borderRadius: 2 * (width / 100),
        paddingHorizontal: 2.5 * (width / 100),
        paddingVertical: 0.75 * (height / 100),
        //@ts-ignore
        ...style,
      }}
    >
      <Text
        style={{
          color: DARKGREY,
          fontFamily: font("Jost", "Regular"),
          //@ts-ignore
          ...textStyle,
        }}
      >
        {content}
      </Text>
    </View>
  );
}
