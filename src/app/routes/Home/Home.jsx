import NavBar from "@/components/NavBar";
import { DARKGREY, GREY } from "@/constants/colors";
import font from "@/constants/fonts";
import {
  Text,
  View,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Shelf from "./Shelf";

function Home() {
  const { width, height } = useWindowDimensions();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            alignItems: "center",
            width: width,
            height: 2 * height,
          }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        >
          <View
            style={{
              display: "flex",
              marginTop: 5 * (height / 100),
              flexDirection: "row",
              width: 90 * (width / 100),
              marginHorizontal: "auto",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image
              source={require("@/assets/images/book.png")}
              style={{ width: 17 * (width / 100), height: 17 * (width / 100) }}
            />
            <TextInput
              style={{
                borderBottomColor: DARKGREY,
                borderBottomWidth: 1,
                width: 60 * (width / 100),
                fontSize: 20,
                color: "black",
                fontFamily: font("Jost", "Regular"),
                paddingLeft: 3 * (width / 100),
                justifyContent: "flex-end",
              }}
              placeholder="Search the catalogue"
              placeholderTextColor={GREY}
            />
          </View>
          <View>
            <Shelf />
          </View>
          <NavBar />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default Home;
