import { useEffect, useState, useCallback } from "react";

import { NavigationContainer, useFocusEffect } from "@react-navigation/native";

import { useFonts } from "expo-font";
import {
  Jost_400Regular,
  Jost_600SemiBold,
  Jost_500Medium,
} from "@expo-google-fonts/jost";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import {
  OpenSans_400Regular,
  OpenSans_500Medium,
} from "@expo-google-fonts/open-sans";

import * as SplashScreen from "expo-splash-screen";

import store from "./state/reduxStore";
import { Provider, useDispatch } from "react-redux";
import { initializeUser } from "./state/redux-slices/userSlice";

import * as NavigationBar from "expo-navigation-bar";

import { StatusBar, Text } from "react-native";

import RootNavigator from "./app/RootNavigator";

import font from "./constants/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({ level: ReanimatedLogLevel.INFO, strict: false });

SplashScreen.preventAutoHideAsync();

const StateContainer = () => {
  const dispatch = useDispatch();

  const [fontsLoaded, fontsErr] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    OpenSans_400Regular,
    OpenSans_500Medium,
  });
  const [authInitialized, setAuthInitialized] = useState(true);

  dispatch(
    initializeUser(() => {
      setAuthInitialized(true);
    })
  );

  useEffect(() => {
    if ((fontsLoaded || fontsErr) && authInitialized) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsErr, authInitialized]);

  if ((!fontsLoaded && !fontsErr) || !authInitialized) {
    return null;
  }

  return <RootNavigator />;
};

function RootContainer() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <StateContainer />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default RootContainer;
