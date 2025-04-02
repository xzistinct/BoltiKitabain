import { useState } from "react";

import ArrowButton from "@/components/ArrowButton";
import font from "@/constants/fonts";
import {
  INPUTHEADER,
  ONBOARDINGNEXTCSS,
  SCREENHEADER,
} from "@/constants/styles";
import {
  View,
  useWindowDimensions,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  Image,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from "react-native";
import { BarIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";
import { BABYBLUE } from "@/constants/colors";
// import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/state/reduxStore";

import { login } from "@/state/redux-slices/userSlice";
import NumberPad from "@/components/NumberPad";
import DualText from "@/components/DualText";
import { SCREENTOPMARGIN } from "../Welcome/Welcome";
import { errors, getErrorFromCode } from "@/constants/errors";
import { translationTable } from "@/constants/translation-table";

export default function SignIn() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [loginErr, setLoginErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [emailHeaderDual, changeEmailHeaderDual] = useState<string | null>(
    null
  );

  const [passwordHeaderDual, changePasswordHeaderDual] = useState<
    string | null
  >(null);

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const language = useAppSelector((state) => state.user.userInfo?.language);

  const handleNext = () => {
    setLoginErr(null);
    setLoading(true);
    let err = false;
    // This has been commented out because the server does not have the below validation
    if (email === null || email.length === 0) {
      changeEmailHeaderDual("Please fill out email");
      err = true;
    }

    if (password === null || password.length === 0) {
      changePasswordHeaderDual("Password is at least 8 characters");
      err = true;
    }

    setLoading(false);

    if (err) {
      return;
    }

    dispatch(
      login({
        username: email || "",
        //@ts-ignore
        password: password,
        callback: (message) => {
          setLoading(false);
          if (message.success || message.error === undefined) {
            return;
          }

          setLoginErr(getErrorFromCode(message.error) + ` (${message.error})`);
        },
      })
    );

    return;
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
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <BarIndicator color={BABYBLUE} size={50} />
        </View>
      )}
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
          <SCREENTOPMARGIN />
          <Image
            source={require("@/assets/images/book.png")}
            style={{
              marginHorizontal: "auto",

              width: 30 * (width / 100),
              height: 30 * (width / 100),
            }}
          />
          <View
            style={{
              // marginTop: 20 * (height / 100),
              width: 80 * (width / 100),
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                //@ts-ignore
                ...SCREENHEADER.textStyle(width, height),
                textAlign: "center",
                marginTop: 0,
                lineHeight: undefined,
              }}
            >
              {language === "Urdu" ? translationTable["Sign in"] : "Sign In"}
            </Text>
            <Text
              style={{
                textAlign: "left",
                marginHorizontal: 3 * (width / 100),

                width: "40%",
              }}
            >
              {language === "Urdu"
                ? translationTable["Good to have you back"]
                : "Good to have you back"}
            </Text>
          </View>

          <View
            style={{
              marginTop: 4 * (height / 100),
            }}
          >
            <View style={{ width: width, height: 3.5 * (height / 100) }}>
              {loginErr && (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 15,
                    color: "red",
                    fontFamily: font("Jost", "Regular"),
                  }}
                >
                  {loginErr}
                </Text>
              )}
            </View>
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
                    onChangeText={(value) => {
                      changeEmailHeaderDual(null);
                      if (value) {
                        setEmail(value.toLowerCase());
                      }
                    }}
                    placeholder="example@pitb.com"
                    placeholderTextColor={"gray"}
                  />
                </View>
              </View>
            </View>

            <View style={{ marginTop: 4 * (height / 100), width: width }}>
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
              <View style={{ marginHorizontal: "auto" }}>
                <TextInput
                  style={TextInputStyle}
                  secureTextEntry={true}
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
              </View>
            </View>
          </View>

          <ArrowButton
            onPress={handleNext}
            style={{
              width: 75,
              height: 55,
              backgroundColor: BABYBLUE,
              marginTop: 8 * (height / 100),
              borderRadius: 15,
            }}
            arrowSize={30}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
