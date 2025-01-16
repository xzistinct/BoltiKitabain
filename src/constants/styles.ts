import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { BABYBLUE } from "./colors";
import font, { tLoadedFonts } from "./fonts";

export const ONBOARDINGNEXTCSS: {
  style: (width: number, height: number) => StyleProp<ViewStyle>;
  font: tLoadedFonts;
  fontSize: number;
  textColor: string;
  arrowSize: number;
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
    };
  },
  font: font("Jost", "Regular"),
  fontSize: 25,
  textColor: "white",
  arrowSize: 20,
};

export const INPUTHEADER: {
  textStyle: (width: number, height: number) => StyleProp<TextStyle>;
  dualTextStyle: () => StyleProp<TextStyle>;
} = {
  textStyle: (width, height) => {
    return {
      fontSize: 25,
      fontFamily: font("Jost", "Regular"),
      color: "black",
      width: 50 * (width / 100),
      marginLeft: 22 * (width / 100),
      height: 32,
      paddingBottom: 0,
    };
  },
  dualTextStyle: () => {
    return {
      color: "red",
      fontSize: 15,
    };
  },
};

export const SCREENHEADER: {
  textStyle: (width: number, height: number) => StyleProp<TextStyle>;
} = {
  textStyle: (width: number, height: number) => {
    return {
      fontFamily: font("Jost", "SemiBold"),
      fontSize: 11.5 * (width / 100),
      marginTop: (height > 700 ? 20 : 12.5) * (height / 100),

      lineHeight: 12.75 * (width / 100),
    };
  },
};
