import { StyleProp, ViewStyle } from "react-native";
import { BABYBLUE } from "./colors";
import font, { tLoadedFonts } from "./fonts";

export const ONBOARDINGNEXTCSS: {
  style: (width: number, height: number) => StyleProp<ViewStyle>;
  font: tLoadedFonts;
} = {
  style: (width: number, height: number) => {
    return {
      backgroundColor: BABYBLUE,
      width: 35 * (width / 100),
      height: 6.5 * (height / 100),
      borderRadius: 15,
      left: 32.5 * (width / 100),
      position: "absolute",
      bottom: 10 * (height / 100),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    };
  },
  font: font("Jost", "Regular"),
};
