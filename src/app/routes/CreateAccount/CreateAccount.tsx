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
} from "react-native";

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

export default function CreateAccount({ route }: any) {
  let userInformation = route.params.userInformation as tUserInformation;
  if (!userInformation) {
    throw new Error("User information not passed to CreateAccount");
  }
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

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

  const handlePhoneNumberChange = () => {
    changeEmailHeaderDual(null);
  };

  const handleNext = () => {
    let err = false;
    if (email === "") {
      changeEmailHeaderDual("Please fill out email");
      err = true;
    }

    if (password === null || password.length < 8) {
      changePasswordHeaderDual("Password must be at least 8 characters");
      err = true;
    }

    if (retypePassword === null || retypePassword !== password) {
      changeRetypePasswordHeaderDual("Passwords do not match");
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

  const TextInputStyle = {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 70 * (width / 100),
    height: 4.5 * (height / 100),
    paddingVertical: 0,

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
            Create account
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginHorizontal: "auto",

              width: 55 * (width / 100),
            }}
          >
            Access more audiobooks with a library card & engage with the
            community
          </Text>

          <View>
            <View style={{ marginTop: 5 * (height / 100) }}>
              <View style={{ width: width }}>
                <DualText
                  originalContent="Phone Number"
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
                      onChangeText={(value) => {
                        changeEmailHeaderDual(null);
                        if (value) {
                          setEmail(value);
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
                originalContent="Password"
                dualContent={passwordHeaderDual}
                style={INPUTHEADER.textStyle(width, height)}
                dualStyle={INPUTHEADER.dualTextStyle()}
              />
              <View style={{ marginHorizontal: "auto" }}>
                <TextInput
                  style={TextInputStyle}
                  secureTextEntry={true}
                  onChangeText={(value) => {
                    changePasswordHeaderDual(null);
                    setPassword(value);
                  }}
                  placeholder="8 characters or more"
                  placeholderTextColor={"gray"}
                />
              </View>
            </View>
            <View style={{ marginTop: 3 * (height / 100), width: width }}>
              <DualText
                originalContent="Retype Password"
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
            content="Create"
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
