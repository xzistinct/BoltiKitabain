import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import {
  BABYBLUE as NAVYBLUE,
  MAGENTA,
  GREY,
  LIGHTGREY,
  DARKERGREY,
} from "@/constants/colors";
import { useNavigation } from "@react-navigation/native";
import font from "@/constants/fonts";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/reduxStore";
import { setAppLanguage } from "@/state/redux-slices/userSlice";
import { translationTable } from "@/constants/translation-table";

export const SCREENTOPMARGIN = () => {
  const { height } = useWindowDimensions();
  return (
    <View style={{ marginTop: (height > 700 ? 15 : 7.5) * (height / 100) }} />
  );
};

function Welcome() {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const language = useAppSelector((state) => state.user.userInfo?.language);

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
        onPress={() => {
          console.log("Switching language");
          if (language === "English") {
            dispatch(setAppLanguage("Urdu"));
          } else {
            dispatch(setAppLanguage("English"));
          }
        }}
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
            ? translationTable["Use app in english"]
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
          color: NAVYBLUE,
          fontSize: 10 * (width / 100),
          fontFamily: "RobotoFlex",
          fontWeight: 600,
          marginBottom: 0,
        }}
      >
        {language === "English" ? "Welcome to" : translationTable["Welcome to"]}
      </Text>

      <Text
        style={{
          fontSize: 11 * (width / 100),
          lineHeight: 14 * (width / 100),
          fontFamily: font("Jost", "SemiBold"),
          marginTop: 0,
        }}
      >
        {language === "English"
          ? "Bolti Kitabain"
          : translationTable["Bolti Kitabain"]}
      </Text>
      <Text>
        {language === "English"
          ? "Listen to the voices of Pakistan"
          : translationTable["Listen to the voices of Pakistan"]}
      </Text>
      <View
        style={{ marginTop: 5 * (height / 100), width: 50 * (width / 100) }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: 8 * (height / 100),
            backgroundColor: NAVYBLUE,
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
            {language === "English"
              ? "Create account"
              : translationTable["Create account"]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            marginTop: 2 * (height / 100),
            height: 8 * (height / 100),
            backgroundColor: NAVYBLUE,
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
            {language === "English" ? "Sign In" : translationTable["Sign in"]}
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
          {language === "English"
            ? "A project of"
            : translationTable["A project of"]}
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
