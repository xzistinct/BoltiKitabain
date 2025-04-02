import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

import { BarIndicator as ActivityIndicator } from "react-native-indicators";

import font from "@/constants/fonts";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/state/reduxStore";
import { useNavigation } from "@react-navigation/native";
import { BABYBLUE } from "@/constants/colors";
import { createAccount, login } from "@/state/redux-slices/userSlice";
import { tResponse, tUser, tUserInformation } from "@/constants/types";
import { getErrorFromCode } from "@/constants/errors";
import { translationTable } from "@/constants/translation-table";

export default function CreatingAccount({ route }: any) {
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const user = route.params.user as tUser;
  const userInformation = route.params.userInformation as tUserInformation;
  const language = useAppSelector((state) => state.user.userInfo?.language);

  const [screenState, setScreenState] = useState<
    "loading" | "error" | "success"
  >("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!user.username || !user.password) {
        return;
      }
      dispatch(
        createAccount({
          user: user,
          userInformation: userInformation,
          callback: (success: tResponse) => {
            console.log("create account success", success);
            if (!success.success && success.error) {
              setScreenState("error");
              setError(getErrorFromCode(success.error));
              return;
            }
            dispatch(
              login({
                username: user.username || "",
                password: user.password || "",
                callback: (message: tResponse) => {
                  console.log("login in create account message", message);
                  if (message.success) {
                    setScreenState("success");
                  }
                  if (message.error) {
                    setScreenState("error");
                    setError(getErrorFromCode(message.error));
                  }
                },
              })
            );
          },
        })
      );
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {screenState === "loading" && (
        <>
          <View style={{ height: height * 0.1 }}>
            <ActivityIndicator color="#000" count={5} />
          </View>
          <Text
            style={{ fontFamily: font("OpenSans", "Medium"), fontSize: 15 }}
          >
            {language === "Urdu"
              ? translationTable["Creating your account, hold tight!"]
              : "Creating your account, hold tight!"}
          </Text>
        </>
      )}
      {screenState === "error" && (
        <View style={{ width: width * 0.8 }}>
          <Text
            style={{ fontFamily: font("OpenSans", "Medium"), fontSize: 20 }}
          >
            {language === "Urdu"
              ? translationTable[
                  "Sorry, we encountered an error while creating your account."
                ]
              : "Sorry, we encountered an error while creating your account."}
          </Text>
          <Text
            style={{
              fontFamily: font("Roboto", "Regular"),
              fontSize: 10,
              marginTop: height * 0.005,
            }}
          >
            {error}
          </Text>
          <View style={{ marginTop: height * 0.05, alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: BABYBLUE,
                width: width * 0.4,
                height: height * 0.065,
                borderRadius: 10,
                justifyContent: "center",
              }}
              onPress={() => {
                //@ts-ignore
                navigation.navigate("Welcome");
              }}
            >
              <Text
                style={{
                  fontFamily: font("OpenSans", "Medium"),
                  fontSize: 17,
                  color: "white",
                  textAlign: "center",
                }}
              >
                {language === "Urdu" ? translationTable["Go back"] : "Go back"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {screenState === "success" && (
        <View style={{ width: width * 0.8 }}>
          <Text
            style={{ fontFamily: font("OpenSans", "Regular"), fontSize: 20 }}
          >
            Account created successfully! Continuing momentarily...
          </Text>
        </View>
      )}
    </View>
  );
}
