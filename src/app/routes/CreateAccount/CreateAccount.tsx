import React, { useState } from "react";
import {
  Text,
  KeyboardAvoidingView,
  useWindowDimensions,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  TextStyle,
  StyleProp,
} from "react-native";

import Entypo from "@expo/vector-icons/Entypo";

import { BABYBLUE } from "@/constants/colors";
import { useNavigation } from "@react-navigation/native";

import font from "@/constants/fonts";
import ArrowButton from "@/components/ArrowButton";
import {
  INPUTHEADER,
  ONBOARDINGNEXTCSS,
  SCREENHEADER,
} from "@/constants/styles";
import DualText from "@/components/DualText";
import NumberPad from "@/components/NumberPad";
import { tUser, tUserInformation } from "@/constants/types";
import { useAppSelector } from "@/state/reduxStore";
import { translationTable } from "@/constants/translation-table";

export default function CreateAccount({ route }: any) {
  let userInformation = route.params.userInformation as tUserInformation;
  if (!userInformation) {
    throw new Error("User information not passed to CreateAccount");
  }
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const language = useAppSelector((state) => state.user.userInfo?.language);

  const [emailHeaderDual, changeEmailHeaderDual] = useState<string | null>(
    null
  );
  const [passwordHeaderDual, changePasswordHeaderDual] = useState<
    string | null
  >(null);

  const [retypePasswordHeaderDual, changeRetypePasswordHeaderDual] = useState<
    string | null
  >(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string | null>(null);
  const [retypePassword, setRetypePassword] = useState<string | null>(null);

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handlePhoneNumberChange = () => {
    changeEmailHeaderDual(null);
  };

  const handleNext = () => {
    let err = false;
    if (email === "") {
      changeEmailHeaderDual(
        language === "Urdu"
          ? translationTable["Please fill out email"]
          : "Please fill out email"
      );
      err = true;
    }

    if (password === null || password.length < 8) {
      changePasswordHeaderDual(
        language === "Urdu"
          ? translationTable["Password must be at least 8 characters"]
          : "Password must be at least 8 characters"
      );
      err = true;
    }

    if (retypePassword === null || retypePassword !== password) {
      changeRetypePasswordHeaderDual(
        language === "Urdu"
          ? translationTable["Passwords do not match"]
          : "Passwords do not match"
      );
      err = true;
    }

    if (err) {
      return;
    }
    //@ts-ignore
    navigation.navigate("CreatingAccount", {
      userInformation: userInformation,
      user: { username: email, password, type: "user" } as tUser,
    });
  };

  const TextInputStyle: StyleProp<TextStyle> = {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 70 * (width / 100),
    height: 4.5 * (height / 100),
    paddingVertical: 0,
    textAlign: "left",
    fontSize: 20,
    paddingHorizontal: 15,
    fontFamily: "Roboto",
    color: "black",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            alignItems: "center",
            width: width,
            height: height,
          }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        >
          <Text
            style={{
              //@ts-ignore
              ...SCREENHEADER.textStyle(width, height),

              textAlign: "center",
            }}
          >
            {language === "English"
              ? "Create an account"
              : translationTable["Create account"]}
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginHorizontal: "auto",

              width: 55 * (width / 100),
            }}
          >
            {language === "Urdu"
              ? translationTable[
                  "Access more audiobooks with a library card & engage with the community"
                ]
              : "Access more audiobooks with a library card & engage with the community"}
          </Text>

          <View>
            <View style={{ marginTop: 5 * (height / 100) }}>
              <View style={{ width: width }}>
                <DualText
                  originalContent={
                    language === "Urdu" ? translationTable["Email"] : "Email"
                  }
                  dualContent={emailHeaderDual}
                  style={INPUTHEADER.textStyle(width, height)}
                  dualStyle={INPUTHEADER.dualTextStyle()}
                />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: "auto",
                    marginTop: 1 * (height / 100),
                    width: width,
                  }}
                >
                  <View style={{ marginHorizontal: "auto" }}>
                    <TextInput
                      style={TextInputStyle}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={(value) => {
                        changeEmailHeaderDual(null);
                        if (value) {
                          console.log(
                            `Original: ${value}, Lowercase: ${value.toLowerCase()}`
                          );
                          setEmail(value.toLowerCase());
                        }
                      }}
                      placeholder="example@pitb.com"
                      placeholderTextColor={"gray"}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 3 * (height / 100), width: width }}>
              <DualText
                originalContent={
                  language === "Urdu"
                    ? translationTable["Password"]
                    : "Password"
                }
                dualContent={passwordHeaderDual}
                style={INPUTHEADER.textStyle(width, height)}
                dualStyle={INPUTHEADER.dualTextStyle()}
              />
              <View
                style={{
                  marginHorizontal: "auto",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={TextInputStyle}
                  secureTextEntry={!passwordVisible}
                  onChangeText={(value) => {
                    changePasswordHeaderDual(null);
                    setPassword(value);
                  }}
                  placeholder={
                    language === "Urdu"
                      ? translationTable["8 characters or more"]
                      : "8 characters or more"
                  }
                  placeholderTextColor={"gray"}
                />
                <TouchableOpacity
                  style={{ position: "absolute", right: 0 }}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Entypo
                    name={passwordVisible ? "eye-with-line" : "eye"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 3 * (height / 100), width: width }}>
              <DualText
                originalContent={
                  language === "Urdu"
                    ? translationTable["Retype password"]
                    : "Retype Password"
                }
                dualContent={retypePasswordHeaderDual}
                style={INPUTHEADER.textStyle(width, height)}
                dualStyle={INPUTHEADER.dualTextStyle()}
              />
              <View style={{ marginHorizontal: "auto" }}>
                <TextInput
                  style={TextInputStyle}
                  secureTextEntry={true}
                  onChangeText={(value) => {
                    changeRetypePasswordHeaderDual(null);
                    setRetypePassword(value);
                  }}
                />
              </View>
            </View>
          </View>
          <ArrowButton
            content={
              language === "Urdu" ? translationTable["Create"] : "Create"
            }
            onPress={handleNext}
            font={ONBOARDINGNEXTCSS.font}
            style={ONBOARDINGNEXTCSS.style(width, height)}
            arrowSize={ONBOARDINGNEXTCSS.arrowSize}
            textSize={ONBOARDINGNEXTCSS.fontSize}
            textColor={ONBOARDINGNEXTCSS.textColor}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
