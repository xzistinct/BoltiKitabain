import React, { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAppDispatch, useAppSelector } from "../state/reduxStore";

import Welcome from "./routes/Welcome/Welcome";
import Home from "./routes/Home/Home";

import { Platform } from "react-native";
import BasicInfo from "./routes/BasicInfo/BasicInfo";
// import InterestedGenres from "./routes/InterestedGenres/InterestedGenres";
import CreateAccount from "./routes/CreateAccount/CreateAccount";
// import RecommendedBook from "./routes/RecommendedBook/RecommendedBook";
import SignIn from "./routes/SignIn/SignIn";

import * as NavigationBar from "expo-navigation-bar";

import { StatusBar, AppState, AppStateStatus } from "react-native";

import CreatingAccount from "./routes/CreatingAccount/CreatingAccount";
import Player from "./routes/Player/Player";
import Search from "./routes/Search/Search";
import Contribute from "./routes/Contribute/Contribute";
import { initializeUser } from "@/state/redux-slices/userSlice";
import LoginLoader from "./routes/LoginLoader/LoginLoader";

type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
  SignIn: undefined;
  BasicInfo: { userType: "Guest" | "Authorized" };
  CreateAccount: undefined;
  InterestedGenres: undefined;
  RecommendedBook: undefined;
  CreatingAccount: undefined;
  Player: { bookId: string };
  Search: { searchQuery: string };
  Contribute: undefined;
  LoginLoading: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useAppDispatch();
  const isGuest = useAppSelector((state) => state.user.isGuest);
  const token = useAppSelector((state) => state.user.token);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Configure both status bar and navigation bar
  const configureAppBars = () => {
    // Status bar (top)
    StatusBar.setBackgroundColor("white");
    StatusBar.setBarStyle("dark-content");

    // Navigation bar (bottom) - Android only
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("rgba(255, 255, 255, 0.87)");
    }
  };

  useEffect(() => {
    dispatch(
      initializeUser(() => {
        setAuthInitialized(true);
      })
    );

    // Set initial configuration
    configureAppBars();

    // Listen for app state changes
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (nextAppState === "active") {
          // Re-apply configuration when app becomes active
          configureAppBars();
        }
      }
    );
  }, []);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: "white",
          statusBarBackgroundColor: "white",
          statusBarStyle: "dark",
        }}
        initialRouteName={
          authInitialized
            ? isGuest || token
              ? "Home"
              : "Welcome"
            : "LoginLoading"
        }
      >
        {authInitialized ? (
          isGuest || token ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              {/* <Stack.Screen
              name="InterestedGenres"
              component={InterestedGenres}
            /> */}
              {/* <Stack.Screen name="RecommendedBook" component={RecommendedBook} /> */}
              <Stack.Screen name="Player" component={Player} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="Contribute" component={Contribute} />
            </>
          ) : (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="BasicInfo" component={BasicInfo} />
              <Stack.Screen name="CreateAccount" component={CreateAccount} />
              <Stack.Screen
                name="CreatingAccount"
                component={CreatingAccount}
              />
            </>
          )
        ) : (
          <Stack.Screen name="LoginLoading" component={LoginLoader} />
        )}
      </Stack.Navigator>
    </>
  );
}

export default RootNavigator;
