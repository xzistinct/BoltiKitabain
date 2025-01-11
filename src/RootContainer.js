import { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import {
  Jost_400Regular,
  Jost_600SemiBold,
  Jost_500Medium,
} from "@expo-google-fonts/jost";
import * as SplashScreen from "expo-splash-screen";

import store from "./state/reduxStore";
import { Provider, useDispatch } from "react-redux";
import { initAuth } from "./state/redux-slices/authSlice";

import { StatusBar, Text } from "react-native";

import RootNavigator from "./app/RootNavigator";

import font from "./constants/fonts";

SplashScreen.preventAutoHideAsync();

const StateContainer = () => {
  const dispatch = useDispatch();

  const [fontsLoaded, fontsErr] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold,
  });
  const [authInitialized, setAuthInitialized] = useState(false);

  dispatch(
    initAuth(() => {
      setAuthInitialized(true);
    })
  );

  useEffect(() => {
    if ((fontsLoaded || fontsErr) && authInitialized === true) {
    }
  }, [fontsLoaded, fontsErr, authInitialized]);

  if ((!fontsLoaded && !fontsErr) || !authInitialized) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <RootNavigator />
    </NavigationContainer>
  );
};

function RootContainer() {
  return (
    <Provider store={store}>
      <StateContainer />
    </Provider>
  );
}

export default RootContainer;
