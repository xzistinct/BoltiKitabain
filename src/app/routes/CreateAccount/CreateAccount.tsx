import React, { useState } from "react";
import {
  SafeAreaView,
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

import AngleRight from "@/components/angleRight";

import { BABYBLUE } from "@/constants/colors";
import { useNavigation } from "@react-navigation/native";

import font from "@/constants/fonts";
import ArrowButton from "@/components/ArrowButton";
import { ONBOARDINGNEXTCSS } from "@/constants/styles";

export default function CreateAccount() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const ogPhoneNumberHeader = "Phone Number";
  const [phoneNumberHeader, changePhoneNumberHeader] =
    useState<string>(ogPhoneNumberHeader);
  const [phoneNumberHeaderErr, setPhoneNumberHeaderErr] =
    useState<boolean>(false);

  const ogPasswordHeader = "Password";
  const [passwordHeader, changePasswordHeader] =
    useState<string>(ogPasswordHeader);
  const [passwordHeaderErr, setPasswordHeaderErr] = useState<boolean>(false);

  const ogRetypePasswordHeader = "Retype Password";
  const [retypePasswordHeader, changeRetypePasswordHeader] = useState<string>(
    ogRetypePasswordHeader
  );
  const [retypePasswordHeaderErr, setRetypePasswordHeaderErr] =
    useState<boolean>(false);

  const [phoneNumber, setPhoneNumber] = useState<Array<number | null>>(
    Array(10).fill(null)
  );
  const [password, setPassword] = useState<string | null>(null);
  const [retypePassword, setRetypePassword] = useState<string | null>(null);

  const phoneNumberInputs: Array<TextInput | null> = Array(10).fill(null);

  const handlePhoneNumberChange = (index: number, value: string) => {
    const newPhoneNumber = [...phoneNumber];
    setPhoneNumberHeaderErr(false);
    changePhoneNumberHeader(ogPhoneNumberHeader);
    if (value === "") {
      newPhoneNumber[index] = null;
      setPhoneNumber(newPhoneNumber);
      return;
    }
    if (isNaN(parseInt(value))) {
      return;
    }
    newPhoneNumber[index] = parseInt(value);

    setPhoneNumber(newPhoneNumber);

    if (value && index < phoneNumber.length - 1) {
      phoneNumberInputs[index + 1]?.focus();
    }
  };

  const handleNext = () => {
    let err = false;
    if (phoneNumber.includes(null)) {
      setPhoneNumberHeaderErr(true);
      changePhoneNumberHeader("Please fill out phone number");
      err = true;
    }

    if (password === null || password.length < 8) {
      setPasswordHeaderErr(true);
      changePasswordHeader("Password must be at least 8 characters");
      err = true;
    }

    if (retypePassword === null || retypePassword !== password) {
      setRetypePasswordHeaderErr(true);
      changeRetypePasswordHeader("Passwords do not match");
      err = true;
    }

    if (err) {
      return;
    }
    //@ts-ignore
    navigation.navigate("InterestedGenres");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Text>Hello</Text>
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
              marginTop: 15 * (height / 100),
              width: 75 * (width / 100),
            }}
          >
            <Text
              style={{
                fontFamily: font("Jost", "SemiBold"),
                fontSize: 11.5 * (width / 100),
                textAlign: "center",
                lineHeight: 12.5 * (width / 100),
              }}
            >
              Create your account
            </Text>
            <Text
              style={{
                textAlign: "center",
                marginHorizontal: 3 * (width / 100),
                paddingHorizontal: 10,
              }}
            >
              Access more audiobooks with a library card & engage with the
              community
            </Text>
          </View>
          <View>
            <View style={{ marginTop: 3 * (height / 100) }}>
              <View style={{ width: width }}>
                <Text
                  style={{
                    fontFamily: font("Jost", "Regular"),
                    fontSize: !phoneNumberHeaderErr ? 25 : 15,
                    color: !phoneNumberHeaderErr ? "black" : "red",
                    width: 50 * (width / 100),
                    marginLeft: 22 * (width / 100),

                    paddingBottom: 0,
                  }}
                >
                  {phoneNumberHeader}
                </Text>
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
                    {phoneNumber.map((num, index) => (
                      <TextInput
                        key={index}
                        style={{
                          borderBottomWidth: 1,
                          color: "black",
                          marginRight: 5,
                          width: 5 * (width / 100),
                          paddingVertical: 0,
                          fontSize: 20,
                        }}
                        maxLength={1}
                        keyboardType="numeric"
                        value={num !== null ? num.toString() : ""}
                        ref={(input) => {
                          phoneNumberInputs[index] = input;
                        }}
                        onChangeText={(value) => {
                          handlePhoneNumberChange(index, value);
                        }}
                        onKeyPress={({ nativeEvent: { key: keyValue } }) => {
                          if (
                            keyValue === "Backspace" &&
                            num === null &&
                            index > 0
                          ) {
                            phoneNumberInputs[index - 1]?.focus();
                          }
                        }}
                      />
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 3 * (height / 100), width: width }}>
              <Text
                style={{
                  marginLeft: 22 * (width / 100),
                  fontSize: !passwordHeaderErr ? 25 : 15,
                  color: !passwordHeaderErr ? "black" : "red",
                  fontFamily: font("Jost", "Regular"),
                }}
              >
                {passwordHeader}
              </Text>
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
                    setPasswordHeaderErr(false);
                    changePasswordHeader(ogPasswordHeader);
                    setPassword(value);
                  }}
                  placeholder="8 characters or more"
                  placeholderTextColor={"gray"}
                />
              </View>
            </View>
            <View style={{ marginTop: 3 * (height / 100), width: width }}>
              <Text
                style={{
                  marginLeft: 22 * (width / 100),
                  fontSize: !retypePasswordHeaderErr ? 25 : 15,
                  color: !retypePasswordHeaderErr ? "black" : "red",
                  fontFamily: font("Jost", "Regular"),
                }}
              >
                {retypePasswordHeader}
              </Text>
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
                    setRetypePasswordHeaderErr(false);
                    changeRetypePasswordHeader(ogRetypePasswordHeader);
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
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
