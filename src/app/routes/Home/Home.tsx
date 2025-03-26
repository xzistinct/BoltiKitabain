import {
  DARKERGREY,
  DARKGREY,
  GREY,
  LIGHTGREY,
  LIGHTERGREY,
  VERYLIGHTGREY,
} from "@/constants/colors";
import font from "@/constants/fonts";
import {
  Text,
  View,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  TextInput,
  StyleProp,
  TextStyle,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import Shelf from "./Shelf";
import { useState } from "react";
import HomeTab from "./HomeTab";
import DiscoverTab from "./DiscoverTab";
import { getBooksInGenre } from "@/helpers/GetBooks";
import BookModal from "@/components/BookModal";
import { useAppDispatch, useAppSelector } from "@/state/reduxStore";
import { logout } from "@/state/redux-slices/userSlice";

const tabs = ["Home", "Discover"] as const;

type tTabs = (typeof tabs)[number];

const NAVBAR = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: tTabs;
  setCurrentTab: React.Dispatch<React.SetStateAction<tTabs>>;
}) => {
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const gender = useAppSelector((state) => state.user.userInfo?.gender);

  console.log("Gender", gender);
  const NAVBARTEXTSTYLE: StyleProp<TextStyle> = {
    fontSize: 3 * (height / 100),
    fontFamily: font("Jost", "Regular"),
    paddingHorizontal: 4 * (width / 100),
    paddingVertical: 0.75 * (height / 100),
    color: DARKGREY,
    borderRadius: 5,
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginHorizontal: "auto",
        }}
      >
        {tabs.map((item, index) => (
          <TouchableOpacity onPress={() => setCurrentTab(item)} key={index}>
            <Text
              style={
                currentTab === item
                  ? {
                      ...NAVBARTEXTSTYLE,
                      backgroundColor: LIGHTERGREY,
                      fontFamily: font("Jost", "Medium"),
                    }
                  : NAVBARTEXTSTYLE
              }
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={{ marginLeft: "auto", marginRight: 10 * (width / 100) }}
        onPress={() => {
          dispatch(logout());
        }}
      >
        <Image
          source={require("@/assets/images/profileicon.png")}
          style={{
            width: width * 0.1,
            height: width * 0.1,
            borderRadius: 1000,
            borderWidth: 1,
            borderColor: DARKGREY,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

function Home() {
  const { width, height } = useWindowDimensions();

  const [currentTab, setCurrentTab] = useState<tTabs>("Home");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        width: width,
        height: height,
      }}
    >
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
          <View
            style={{
              display: "flex",
              marginTop: 5 * (height / 100),
              flexDirection: "row",
              width: 90 * (width / 100),
              marginHorizontal: "auto",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image
              source={require("@/assets/images/book.png")}
              style={{ width: 17 * (width / 100), height: 17 * (width / 100) }}
            />
            <TextInput
              style={{
                borderBottomColor: DARKGREY,
                borderBottomWidth: 1,
                width: 60 * (width / 100),
                fontSize: 20,
                color: "black",
                fontFamily: font("Jost", "Regular"),
                paddingLeft: 3 * (width / 100),
                justifyContent: "flex-end",
              }}
              placeholder="Search the catalogue"
              placeholderTextColor={GREY}
            />
          </View>

          <ScrollView
            scrollEnabled={true}
            style={{ flex: 1, width: width }}
            removeClippedSubviews={true}
          >
            <NAVBAR currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <View>{currentTab === "Home" ? <HomeTab /> : <DiscoverTab />}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default Home;
