import { BABYBLUE } from "@/constants/colors";
import { useWindowDimensions, View } from "react-native";
import { BarIndicator } from "react-native-indicators";

export default function LoadingOverlay() {
  return (
    <>
      <View
        style={{
          position: "absolute",

          zIndex: 1000,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BarIndicator count={5} color={"black"} />
      </View>
    </>
  );
}
