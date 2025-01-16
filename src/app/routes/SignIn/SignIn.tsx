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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BABYBLUE } from "@/constants/colors";
import { useDispatch } from "react-redux";

import { login } from "@/state/redux-slices/authSlice";
import NumberPad from "@/components/NumberPad";
import DualText from "@/components/DualText";

export default function SignIn() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [loginErr, setLoginErr] = useState<string | null>(null);

  const [phoneNumberHeaderDual, changePhoneNumberHeaderDual] = useState<
    string | null
  >(null);

  const [passwordHeaderDual, changePasswordHeaderDual] = useState<
    string | null
  >(null);

  const [phoneNumber, setPhoneNumber] = useState<Array<number | null>>(
    Array(10).fill(null)
  );
  const [password, setPassword] = useState<string | null>(null);

  const handleNext = () => {
    setLoginErr(null);
    let err = false;
    if (phoneNumber.includes(null)) {
      changePhoneNumberHeaderDual("Please fill out phone number");
      err = true;
    }

    if (password === null || password.length < 8) {
      changePasswordHeaderDual("Password is at least 8 characters");
      err = true;
    }

    if (err) {
      return;
    }

    dispatch(
      login({
        username: phoneNumber.join(""),
        //@ts-ignore
        password: password,
        callback: (message) => {
          if (message === "success") {
            return;
          }
          setLoginErr(message);
        },
      })
    );

    return;
  };

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
          <Image
            source={require("@/assets/images/book.png")}
            style={{
              marginHorizontal: "auto",
              marginTop: 10 * (height / 100),
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
              Sign In
            </Text>
            <Text
              style={{
                textAlign: "left",
                marginHorizontal: 3 * (width / 100),

                width: "40%",
              }}
            >
              Good to have you back!
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
                    fontFamily: font("Jost", "Medium"),
                  }}
                >
                  {loginErr}
                </Text>
              )}
            </View>
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
                    onChangeNumber={() => {
                      changePhoneNumberHeaderDual(null);
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={{ marginTop: 6 * (height / 100), width: width }}>
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
          </View>
          <TouchableOpacity style={{ marginTop: 2 * (height / 100) }}>
            <Text style={{ color: BABYBLUE, textDecorationLine: "underline" }}>
              Forgot password? Get OTP
            </Text>
          </TouchableOpacity>
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
