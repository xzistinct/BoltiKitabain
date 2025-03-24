import React, { useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import store from "../state/reduxStore";
import { useSelector, useDispatch } from "react-redux";

import Welcome from "./routes/Welcome/Welcome";
import Home from "./routes/Home/Home";

import { Text } from "react-native";
import BasicInfo from "./routes/BasicInfo/BasicInfo";
import InterestedGenres from "./routes/InterestedGenres/InterestedGenres";
import CreateAccount from "./routes/CreateAccount/CreateAccount";
import RecommendedBook from "./routes/RecommendedBook/RecommendedBook";
import SignIn from "./routes/SignIn/SignIn";

import { RootState } from "../state/reduxStore";
import CreatingAccount from "./routes/CreatingAccount/CreatingAccount";

type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
  SignIn: undefined;
  BasicInfo: { userType: "Guest" | "Authorized" };
  CreateAccount: undefined;
  InterestedGenres: undefined;
  RecommendedBook: undefined;
  CreatingAccount: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch();
  const isGuest = useSelector((state: RootState) => state.user.isGuest);
  const token = useSelector((state: RootState) => state.user.token);

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: "white",
          statusBarBackgroundColor: "white",
          statusBarStyle: "dark",
        }}
        initialRouteName={isGuest || token ? "Home" : "Welcome"}
      >
        {isGuest || token ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="InterestedGenres"
              component={InterestedGenres}
            />
            <Stack.Screen name="RecommendedBook" component={RecommendedBook} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="BasicInfo" component={BasicInfo} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="CreatingAccount" component={CreatingAccount} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

export default RootNavigator;
