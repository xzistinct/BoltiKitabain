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
} from "react-native";

import { BABYBLUE, GREY, HOTPINK, LIGHTGREY } from "@/constants/colors";

import { useNavigation } from "@react-navigation/native";

import isValidDate from "@/helpers/ValidDate";

import font from "@/constants/fonts";
import ArrowButton from "@/components/ArrowButton";
import { ONBOARDINGNEXTCSS } from "@/constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BasicInfo({ route }: { route: any }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const { navigateTo } = route.params;

  const [fullName, changeFullName] = useState("");

  const ogFullNameHeader = "Full Name",
    ogDOBHeader = "Date of birth",
    ogGenderHeader = "Gender";

  const [fullNameHeader, changeFullNameHeader] = useState(ogFullNameHeader);
  const [dobHeader, changeDOBHeader] = useState(ogDOBHeader);
  const [genderHeader, changeGenderHeader] = useState(ogGenderHeader);

  const [fullNameHeaderErr, setFullNameHeaderErr] = useState(false);
  const [dobHeaderErr, setDOBHeaderErr] = useState(false);
  const [genderHeaderErr, setGenderHeaderErr] = useState(false);

  const [dobMonth, setDOBMonth] = useState<number | null>(null);
  const [dobDay, setDOBDay] = useState<number | null>(null);
  const [dobYear, setDOBYear] = useState<number | null>(null);

  const [gender, setGender] = useState<"Male" | "Female" | null>(null);

  const handleNext = () => {
    let err = false;
    if (gender === null) {
      setGenderHeaderErr(true);
      changeGenderHeader("This is a required field");
      err = true;
    }
    if (fullName[0] === " " || /[^a-zA-Z\s]/.test(fullName)) {
      setFullNameHeaderErr(true);
      changeFullNameHeader("Please enter a valid name");
      err = true;
    } else if (
      fullName.split(" ").length < 2 ||
      !fullName.split(" ").every((str) => str.length >= 3)
    ) {
      setFullNameHeaderErr(true);
      changeFullNameHeader("Please enter your full name");
      err = true;
    }
    if (fullName.length < 3) {
      setFullNameHeaderErr(true);
      changeFullNameHeader("Name has to be at least 3 characters long");
      err = true;
    }

    if (
      !isValidDate(dobDay, dobMonth, dobYear) ||
      //@ts-ignore
      dobYear < new Date().getFullYear() - 110 ||
      //@ts-ignore
      dobYear > new Date().getFullYear() - 5
    ) {
      setDOBHeaderErr(true);
      changeDOBHeader("Please input a valid date");
      err = true;
    }
    if (dobMonth === null || dobDay === null || dobYear === null) {
      setDOBHeaderErr(true);
      changeDOBHeader("This is a required field");
      err = true;
    }
    if (err) {
      return;
    }
    //@ts-ignore
    navigation.navigate(navigateTo);
  };

  const dobDayInput = useRef(null);
  const dobMonthInput = useRef(null);
  const dobYearInput = useRef(null);

  return (
    <SafeAreaView
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
          }}
        >
          <>
            <Text
              style={{
                fontFamily: font("Jost", "SemiBold"),
                fontSize: 11.5 * (width / 100),
                marginTop: 15 * (height / 100),
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
          </>
          <View style={{ marginTop: 7.5 * (height / 100) }}>
            <View style={{}}>
              <Text
                style={{
                  fontFamily: font("Jost", "Regular"),
                  fontSize: !fullNameHeaderErr ? 25 : 15,
                  color: !fullNameHeaderErr ? "black" : "red",
                  width: 50 * (width / 100),

                  paddingBottom: 0,
                }}
              >
                {fullNameHeader}
              </Text>
              <TextInput
                value={fullName}
                onChangeText={(text) => {
                  if (/[^a-zA-Z\s]/.test(text)) {
                    changeFullNameHeader(
                      "Only alphabetical characters allowed"
                    );
                    setFullNameHeaderErr(true);
                    return;
                  }
                  if (text.length > 35) {
                    return;
                  }
                  changeFullNameHeader(ogFullNameHeader);
                  setFullNameHeaderErr(false);
                  changeFullName(text);
                }}
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                  width: 55 * (width / 100),
                  height: 4.5 * (height / 100),
                  paddingVertical: 0,

                  fontSize: 20,
                  paddingHorizontal: 15,
                  fontFamily: "Roboto",
                  color: "black",
                }}
              />
            </View>
            <View
              style={{
                marginTop: 3 * (height / 100),
              }}
            >
              <Text
                style={{
                  fontFamily: font("Jost", "Regular"),
                  fontSize: !dobHeaderErr ? 25 : 15,
                  color: !dobHeaderErr ? "black" : "red",
                  paddingBottom: 0,
                  width: 50 * (width / 100),
                }}
              >
                {dobHeader}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: 55 * (width / 100),
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <TextInput
                  keyboardType="number-pad"
                  ref={dobMonthInput}
                  placeholder={"mm"}
                  placeholderTextColor={"black"}
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    width: 12 * (width / 100),
                    height: 4.5 * (height / 100),
                    paddingVertical: 0,
                    fontSize: 20,
                    paddingHorizontal: 5,
                    fontFamily: "Roboto",
                    color: "black",
                    textAlign: "center",
                  }}
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
                      changeDOBHeader(ogDOBHeader);
                      setDOBHeaderErr(false);
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
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    width: 12 * (width / 100),
                    height: 4.5 * (height / 100),
                    paddingVertical: 0,
                    fontSize: 20,
                    paddingHorizontal: 5,
                    fontFamily: "Roboto",
                    color: "black",
                    textAlign: "center",
                  }}
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
                      changeDOBHeader(ogDOBHeader);
                      setDOBHeaderErr(false);
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
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    width: 14 * (width / 100),
                    height: 4.5 * (height / 100),
                    paddingVertical: 0,
                    fontSize: 20,
                    paddingHorizontal: 5,
                    fontFamily: "Roboto",
                    color: "black",
                    textAlign: "center",
                  }}
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
                    changeDOBHeader(ogDOBHeader);
                    setDOBHeaderErr(false);
                    setDOBYear(parseInt(text));
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: 3 * (height / 100),
              }}
            >
              <Text
                style={{
                  fontFamily: font("Jost", "Regular"),
                  fontSize: !genderHeaderErr ? 25 : 15,
                  color: !genderHeaderErr ? "black" : "red",
                  paddingBottom: 0,
                  width: 50 * (width / 100),
                }}
              >
                {genderHeader}
              </Text>
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
                    setGenderHeaderErr(false);
                    changeGenderHeader(ogGenderHeader);
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
                    setGenderHeaderErr(false);
                    changeGenderHeader(ogGenderHeader);
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
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
