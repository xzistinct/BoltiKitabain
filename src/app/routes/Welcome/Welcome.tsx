import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useSelector } from "react-redux";

import {
  BABYBLUE,
  MAGENTA,
  GREY,
  LIGHTGREY,
  DARKERGREY,
} from "@/constants/colors";
import { useNavigation } from "@react-navigation/native";
import font from "@/constants/fonts";
import { useState } from "react";

export const SCREENTOPMARGIN = () => {
  const { height } = useWindowDimensions();
  return (
    <View style={{ marginTop: (height > 700 ? 15 : 7.5) * (height / 100) }} />
  );
};

function Welcome() {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();

  const [language, setLanguage] = useState<"English" | "Urdu">("English");

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        position: "relative",
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: height * 0.075,
          right: width * 0.1,
        }}
        onPress={() =>
          language === "English" ? setLanguage("Urdu") : setLanguage("English")
        }
      >
        <Text
          style={{
            fontFamily: font("OpenSans", "Regular"),
            color: DARKERGREY,
            fontSize: 18,
            textDecorationLine: "underline",
          }}
        >
          {language === "English"
            ? "اردو میں ایپ استعمال کریں"
            : "Use app in English"}
        </Text>
      </TouchableOpacity>
      <SCREENTOPMARGIN />
      <Image
        source={require("@/assets/images/book.png")}
        style={{
          marginHorizontal: "auto",

          width: 30 * (width / 100),
          height: 30 * (width / 100),
        }}
      />

      <Text
        style={{
          color: BABYBLUE,
          fontSize: 10 * (width / 100),
          fontFamily: "RobotoFlex",
          fontWeight: 600,
          marginBottom: 0,
        }}
      >
        Welcome to
      </Text>

      <Text
        style={{
          fontSize: 11 * (width / 100),
          lineHeight: 14 * (width / 100),
          fontFamily: font("Jost", "SemiBold"),
          marginTop: 0,
        }}
      >
        Bolti Kitabain
      </Text>
      <Text>Listen to the voices of Pakistan</Text>
      <View
        style={{ marginTop: 5 * (height / 100), width: 50 * (width / 100) }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: 8 * (height / 100),
            backgroundColor: BABYBLUE,
            borderRadius: 3 * (width / 100),
          }}
          onPress={() =>
            //@ts-ignore
            navigation.navigate("BasicInfo", { userType: "Authorized" })
          }
        >
          <Text
            style={{
              color: "white",
              fontSize: 5 * (width / 100),
              fontFamily: font("Jost", "Medium"),
              textAlign: "center",
              marginVertical: "auto",
            }}
          >
            Create an account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            marginTop: 2 * (height / 100),
            height: 8 * (height / 100),
            backgroundColor: BABYBLUE,
            borderRadius: 3 * (width / 100),
          }}
          onPress={() =>
            //@ts-ignore
            navigation.navigate("SignIn")
          }
        >
          <Text
            style={{
              color: "white",
              fontSize: 5 * (width / 100),
              fontFamily: font("Jost", "Medium"),
              textAlign: "center",
              marginVertical: "auto",
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 5 * (height / 100),
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text style={{ color: GREY, marginVertical: "auto", marginRight: 10 }}>
          A project of
        </Text>
        <Image
          source={require("../../../assets/images/pitb.png")}
          style={{ width: 10 * (width / 100), height: 10 * (width / 100) }}
        />
      </View>
    </View>
  );
}

export default Welcome;
