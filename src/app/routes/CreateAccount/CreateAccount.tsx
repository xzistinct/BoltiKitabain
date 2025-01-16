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

export default function CreateAccount() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const [phoneNumberHeaderDual, changePhoneNumberHeaderDual] = useState<
    string | null
  >(null);
  const [passwordHeaderDual, changePasswordHeaderDual] = useState<
    string | null
  >(null);

  const [retypePasswordHeaderDual, changeRetypePasswordHeaderDual] = useState<
    string | null
  >(null);

  const [phoneNumber, setPhoneNumber] = useState<Array<number | null>>(
    Array(10).fill(null)
  );
  const [password, setPassword] = useState<string | null>(null);
  const [retypePassword, setRetypePassword] = useState<string | null>(null);

  const handlePhoneNumberChange = () => {
    changePhoneNumberHeaderDual(null);
  };

  const handleNext = () => {
    let err = false;
    if (phoneNumber.includes(null)) {
      changePhoneNumberHeaderDual("Please fill out phone number");
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
    navigation.navigate("InterestedGenres");
  };

  console.log(height);
  console.log(useWindowDimensions().scale);

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
                  dualContent={phoneNumberHeaderDual}
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
                  <Text
                    style={{
                      fontFamily: font("Jost", "Regular"),
                      fontSize: 20,
                      color: "black",
                      marginRight: 81 * (width / 100),

                      marginLeft: "auto",
                      paddingBottom: 0,
                    }}
                  >
                    + 92
                  </Text>
                  <View
                    style={{
                      position: "absolute",
                      left: 22 * (width / 100),
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <NumberPad
                      numbers={phoneNumber}
                      setNumbers={setPhoneNumber}
                      onChangeNumber={handlePhoneNumberChange}
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
              <View style={{ marginLeft: 22 * (width / 100) }}>
                <TextInput
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    width: 57 * (width / 100),
                    height: 4.5 * (height / 100),
                    paddingVertical: 0,

                    fontSize: 20,
                    paddingHorizontal: 15,
                    fontFamily: "Roboto",
                    color: "black",
                  }}
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
              <View style={{ marginLeft: 22 * (width / 100) }}>
                <TextInput
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    width: 57 * (width / 100),
                    height: 4.5 * (height / 100),
                    paddingVertical: 0,

                    fontSize: 20,
                    paddingHorizontal: 15,
                    fontFamily: "Roboto",
                    color: "black",
                  }}
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
