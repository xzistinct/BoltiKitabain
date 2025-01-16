import { LIGHTBROWN } from "@/constants/colors";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  Text,
} from "react-native";

const SHELFBOTTOM = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        width: 5 * (width / 100),
        height: 0,
        borderTopWidth: 10,
        borderTopColor: LIGHTBROWN,

        borderLeftWidth: 1 * (width / 100),
        borderLeftColor: "transparent",
        borderRightWidth: 1 * (width / 100),
        borderRightColor: "transparent",
        borderStyle: "solid",
      }}
    />
  );
};

export default function Shelf() {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        width: width,
        height: height,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView>
          <View
            style={{
              width: "90%",
              height: 2 * (height / 100),
              backgroundColor: LIGHTBROWN,
              borderRadius: 5,
              marginHorizontal: "auto",
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <SHELFBOTTOM />
            <SHELFBOTTOM />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
