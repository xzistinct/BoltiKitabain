import { Text, useWindowDimensions, View } from "react-native";
import { GREY } from "@/constants/colors";

export default function NavBar() {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        width: width,
        height: 10 * height,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        backgroundColor: GREY,
      }}
    ></View>
  );
}
