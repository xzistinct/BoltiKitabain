import { useEffect } from "react";

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

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const dispatch = useDispatch();
  const isGuest = useSelector((state) => state.auth.isGuest);
  const token = useSelector((state) => state.auth.token);

  console.log(isGuest, token);
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
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="BasicInfo" component={BasicInfo} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen
              name="InterestedGenres"
              component={InterestedGenres}
            />
            <Stack.Screen name="RecommendedBook" component={RecommendedBook} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

export default RootNavigator;
