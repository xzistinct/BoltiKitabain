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

const Stack = createNativeStackNavigator();

const Loading = () => {
  return <Text>Loading</Text>;
};

function RootNavigator() {
  const dispatch = useDispatch();

  const successfulLogin = false;

  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false, navigationBarColor: "white" }}
        initialRouteName={successfulLogin ? "Home" : "Welcome"}
      >
        {successfulLogin ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="BasicInfo" component={BasicInfo} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen
              name="InterestedGenres"
              component={InterestedGenres}
            />
            <Stack.Screen name="RecommendedBook" component={RecommendedBook} />
          </>
        )}
        <Stack.Screen name="Loading" component={Loading} />
      </Stack.Navigator>
    </>
  );
}

export default RootNavigator;
