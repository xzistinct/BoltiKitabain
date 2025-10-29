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
import { tError, tResponse, tUser, tUserInformation } from "@/constants/types";
import { errors, getErrorFromCode } from "@/constants/errors";
import { translationTable } from "@/constants/translation-table";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";

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
  const [error, setError] = useState<tError | null>(null);

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
              setError(success.error);
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
                    setError(message.error);
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
        <LoadingScreen
          content={
            language === "Urdu"
              ? translationTable["Creating your account, hold tight!"]
              : "Creating your account, hold tight!"
          }
        />
      )}
      {screenState === "error" && error && (
        <ErrorScreen
          error={error}
          content={
            language === "Urdu"
              ? translationTable[
                  "Sorry, we encountered an error while creating your account."
                ]
              : "Sorry, we encountered an error while creating your account."
          }
          onPress={() => {
            //@ts-ignore
            navigation.navigate("Welcome");
          }}
          buttonContent={
            language === "Urdu" ? translationTable["Go back"] : "Go back"
          }
        />
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
