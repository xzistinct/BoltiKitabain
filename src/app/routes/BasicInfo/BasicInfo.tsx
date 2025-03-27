import React, { useRef, useState } from "react";
import {
  Text,
  TextInput,
  useWindowDimensions,
  View,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  StyleProp,
  TextStyle,
} from "react-native";

import { BABYBLUE, GREY, HOTPINK, LIGHTGREY } from "@/constants/colors";

import {
  StaticScreenProps,
  useNavigation,
  RouteProp,
} from "@react-navigation/native";

import isValidDate from "@/helpers/ValidDate";

import font from "@/constants/fonts";
import ArrowButton from "@/components/ArrowButton";
import {
  INPUTHEADER,
  ONBOARDINGNEXTCSS,
  SCREENHEADER,
} from "@/constants/styles";
import DualText from "@/components/DualText";
import { tResponse, tUserInformation } from "@/constants/types";
import { useAppDispatch } from "@/state/reduxStore";

import { continueAsGuest } from "@/state/redux-slices/userSlice";

export default function BasicInfo({ route }: any) {
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const userType = route.params.userType as "Guest" | "Authorized";

  if (!userType) {
    throw new Error("Error occured, please try again later");
  }

  const [fullName, changeFullName] = useState("");

  const [fullNameHeaderDual, changeFullNameHeaderDual] = useState<
    string | null
  >(null);
  const [dobHeaderDual, changeDOBHeaderDual] = useState<string | null>(null);
  const [genderHeaderDual, changeGenderHeaderDual] = useState<string | null>(
    null
  );

  const [dobMonth, setDOBMonth] = useState<number | null>(null);
  const [dobDay, setDOBDay] = useState<number | null>(null);
  const [dobYear, setDOBYear] = useState<number | null>(null);

  const [gender, setGender] = useState<"Male" | "Female" | null>(null);

  const handleNext = () => {
    let err = false;
    if (gender === null) {
      changeGenderHeaderDual("This is a required field");
      err = true;
    }
    if (fullName[0] === " " || /[^a-zA-Z\s]/.test(fullName)) {
      changeFullNameHeaderDual("Please enter a valid name");
      err = true;
    } else if (
      fullName.split(" ").length < 2 ||
      !fullName.split(" ").every((str: string) => str.length >= 3)
    ) {
      changeFullNameHeaderDual("Please enter your full name");
      err = true;
    }
    if (fullName.length < 3) {
      changeFullNameHeaderDual("Name must be at least 3 characters long");
      err = true;
    }

    if (
      !isValidDate(dobDay, dobMonth, dobYear) ||
      //@ts-ignore
      dobYear < new Date().getFullYear() - 110 ||
      //@ts-ignore
      dobYear > new Date().getFullYear() - 5
    ) {
      changeDOBHeaderDual("Please input a valid date");
      err = true;
    }
    if (dobMonth === null || dobDay === null || dobYear === null) {
      changeDOBHeaderDual("This is a required field");
      err = true;
    }
    if (err) {
      return;
    }
    console.log("userType", userType);
    if (userType === "Authorized") {
      //@ts-ignore
      navigation.navigate("CreateAccount", {
        userInformation: {
          dob: { day: dobDay, month: dobYear, year: dobYear },
          gender: gender,
          name: fullName,
        },
      } as { userInformation: tUserInformation });
    } else {
      dispatch(
        continueAsGuest({
          userInfo: {
            dob: { day: dobDay, month: dobMonth, year: dobYear },
            name: fullName,
            gender: gender,
          },
          callback: (success: tResponse) => {},
        })
      );
    }
  };

  const dobDayInput = useRef(null);
  const dobMonthInput = useRef(null);
  const dobYearInput = useRef(null);

  const dobInputStyle: StyleProp<TextStyle> = {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    minWidth: 37.5,
    height: 4.5 * (height / 100),
    paddingVertical: 0,
    fontSize: 20,

    fontFamily: "Roboto",
    color: "black",
    textAlign: "center",
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            }}
          >
            First Things First
          </Text>
          <Text
            style={{
              width: 65 * (width / 100),
              textAlign: "center",
              fontSize: 15,
            }}
          >
            We need some basic information to improve your experience
          </Text>

          <View
            style={{
              marginTop: 7.5 * (height / 100),
              display: "flex",

              width: width,
            }}
          >
            <DualText
              originalContent="Full Name"
              dualContent={null}
              style={INPUTHEADER.textStyle(width, height)}
              dualStyle={INPUTHEADER.dualTextStyle()}
            />
            <TextInput
              value={fullName}
              onChangeText={(text) => {
                if (/[^a-zA-Z\s]/.test(text)) {
                  changeFullNameHeaderDual(
                    "Only alphabetical characters allowed"
                  );

                  return;
                }
                if (text.length > 35) {
                  return;
                }
                changeFullNameHeaderDual(null);

                changeFullName(text);
              }}
              style={{
                borderBottomColor: "black",
                borderBottomWidth: 1,
                width: 55 * (width / 100),
                height: 4.5 * (height / 100),
                paddingVertical: 0,
                marginHorizontal: "auto",
                fontSize: 20,
                paddingHorizontal: 15,
                fontFamily: "Roboto",
                color: "black",
              }}
            />

            <DualText
              originalContent="Date of Birth"
              dualContent={dobHeaderDual}
              style={{
                //@ts-ignore
                ...INPUTHEADER.textStyle(width, height),
                marginTop: 3 * (height / 100),
              }}
              dualStyle={INPUTHEADER.dualTextStyle()}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: 55 * (width / 100),
                justifyContent: "space-around",
                alignItems: "center",
                marginHorizontal: "auto",
              }}
            >
              <TextInput
                keyboardType="number-pad"
                ref={dobMonthInput}
                placeholder={"mm"}
                placeholderTextColor={"black"}
                style={dobInputStyle}
                value={dobMonth?.toString()}
                onSubmitEditing={() => {
                  if (!dobDay) {
                    //@ts-ignore
                    dobDayInput.current.focus();
                  }
                }}
                onChangeText={(text) => {
                  if (text.length === 0) {
                    setDOBMonth(null);
                    return;
                  }

                  if (!/^\d+$/.test(text)) {
                    return;
                  }

                  if (text.length <= 2) {
                    changeDOBHeaderDual(null);

                    setDOBMonth(parseInt(text));
                  }
                  if (
                    text.length >= 2 &&
                    !isNaN(parseInt(text.charAt(text.length - 1)))
                  ) {
                    if (text.length > 2) {
                      setDOBDay(parseInt(text.charAt(text.length - 1)));
                    }
                    //@ts-ignore
                    dobDayInput.current.focus();
                    return;
                  }
                }}
              />
              <View
                style={{
                  position: "static",
                  transform: [{ rotate: "-70deg" }],
                  borderRadius: 100,
                  paddingHorizontal: 0,
                  width: 25,
                  height: 1,
                  borderBottomColor: "black",
                  borderBottomWidth: 2,
                }}
              />
              <TextInput
                keyboardType="number-pad"
                placeholder={"dd"}
                ref={dobDayInput}
                placeholderTextColor={"black"}
                style={dobInputStyle}
                value={dobDay?.toString()}
                onKeyPress={({ nativeEvent: { key: keyValue } }) => {
                  if (keyValue === "Backspace" && dobDay === null) {
                    //@ts-ignore
                    dobMonthInput.current.focus();
                  }
                }}
                onSubmitEditing={() => {
                  if (!dobYear) {
                    //@ts-ignore
                    dobYearInput.current.focus();
                  }
                }}
                onChangeText={(text) => {
                  if (text.length === 0) {
                    setDOBDay(null);
                  }

                  if (!/^\d+$/.test(text) && text.length === 0) {
                    return;
                  }
                  if (text.length <= 2) {
                    changeDOBHeaderDual(null);

                    setDOBDay(parseInt(text));
                  }
                  if (
                    text.length >= 2 &&
                    !isNaN(parseInt(text.charAt(text.length - 1)))
                  ) {
                    if (text.length > 2) {
                      setDOBYear(parseInt(text.charAt(text.length - 1)));
                    }
                    //@ts-ignore
                    dobYearInput.current.focus();

                    return;
                  }
                }}
              />
              <View
                style={{
                  position: "static",
                  transform: [{ rotate: "-70deg" }],
                  paddingHorizontal: 0,
                  borderRadius: 100,
                  width: 25,
                  height: 1,
                  borderBottomColor: "black",
                  borderBottomWidth: 2,
                }}
              />
              <TextInput
                keyboardType="number-pad"
                ref={dobYearInput}
                maxLength={4}
                placeholder={"yyyy"}
                placeholderTextColor={"black"}
                style={dobInputStyle}
                value={dobYear?.toString()}
                onKeyPress={({ nativeEvent: { key: keyValue } }) => {
                  if (keyValue === "Backspace" && dobYear === null) {
                    //@ts-ignore
                    dobDayInput.current.focus();
                  }
                }}
                onChangeText={(text) => {
                  if (text.length === 0) {
                    setDOBYear(null);
                    return;
                  }
                  if (!/^\d+$/.test(text)) {
                    return;
                  }
                  changeDOBHeaderDual(null);

                  setDOBYear(parseInt(text));
                }}
              />
            </View>
            <View
              style={{
                marginTop: 3 * (height / 100),
                width: width,
              }}
            >
              <DualText
                originalContent="Gender"
                dualContent={genderHeaderDual}
                style={INPUTHEADER.textStyle(width, height)}
                dualStyle={INPUTHEADER.dualTextStyle()}
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: 55 * (width / 100),
                  height: 6.75 * (height / 100),
                  borderColor:
                    gender === null
                      ? "black"
                      : gender === "Male"
                      ? BABYBLUE
                      : HOTPINK,
                  borderWidth: 1,
                  borderRadius: 50,
                  alignItems: "center",
                  marginTop: 1.5 * (height / 100),
                  marginHorizontal: "auto",
                }}
              >
                <Pressable
                  style={{
                    width: "50%",
                    borderRightWidth: 1,
                    borderRightColor:
                      gender === null
                        ? "black"
                        : gender === "Male"
                        ? BABYBLUE
                        : HOTPINK,
                  }}
                  onPress={() => {
                    setGender("Male");

                    changeGenderHeaderDual(null);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: "center",

                      fontWeight: "condensed",
                      color:
                        gender === null
                          ? "black"
                          : gender === "Male"
                          ? BABYBLUE
                          : GREY,
                      fontFamily: "RobotoFlex",
                    }}
                  >
                    Male
                  </Text>
                </Pressable>
                <Pressable
                  style={{ width: "50%" }}
                  onPress={() => {
                    setGender("Female");

                    changeGenderHeaderDual(null);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "condensed",
                      color:
                        gender === null
                          ? "black"
                          : gender === "Female"
                          ? HOTPINK
                          : GREY,
                      fontFamily: "RobotoFlex",
                      textAlign: "center",
                    }}
                  >
                    Female
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <ArrowButton
            content="Next"
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
