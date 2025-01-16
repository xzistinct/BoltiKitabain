import React, { useEffect, useCallback } from "react";

import {
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { DARKGREY, GREY } from "@/constants/colors";

import { useFocusEffect } from "@react-navigation/native";

import * as NavigationBar from "expo-navigation-bar";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function NavBar() {
  const { width, height } = useWindowDimensions();
  const route = useRoute();

  NavigationBar.setBackgroundColorAsync(GREY);
  NavigationBar.setBorderColorAsync(GREY);
  NavigationBar.setButtonStyleAsync("light");

  const navIcons = [[""]];

  return (
    <>
      <View
        style={{
          width: width,
          height: 8 * (height / 100),
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: GREY,
          position: "absolute",
          bottom: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <AntDesign
            name="home"
            size={4.1 * (height / 100)}
            color="white"
            style={{
              backgroundColor: route.name === "Home" ? DARKGREY : undefined,
              padding: 1 * (height / 100),
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome6
            name="compass"
            size={4.1 * (height / 100)}
            color="white"
            style={{
              backgroundColor: route.name === "Discover" ? DARKGREY : undefined,
              padding: 1 * (height / 100),
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5
            name="user-cog"
            size={3.5 * (height / 100)}
            color="white"
            style={{
              backgroundColor: route.name === "Settings" ? DARKGREY : undefined,
              padding: 1 * (height / 100),
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
