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

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
        marginBottom: 2.5 * (height / 100),
        width: width,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: width * 0.1,
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
      <View
        style={{
          marginLeft: "auto",
          marginRight: 15 * (width / 100),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setIsDropdownVisible(!isDropdownVisible);
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
        {isDropdownVisible && (
          <View
            style={{
              position: "absolute",
              top: width * 0.11,
              width: 25 * (width / 100),
              left: -6.25 * (width / 100),
              backgroundColor: "white",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: LIGHTGREY,
              padding: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              elevation: 3,
              zIndex: 1000,
            }}
          >
            <TouchableOpacity
              style={{ paddingVertical: 8 }}
              onPress={() => {
                setIsDropdownVisible(false);
              }}
            >
              <Text style={{ fontFamily: font("Jost", "Regular") }}>
                Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingVertical: 8 }}
              onPress={() => {
                dispatch(logout());
                setIsDropdownVisible(false);
              }}
            >
              <Text style={{ fontFamily: font("Jost", "Regular") }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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

          <NAVBAR currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <View>{currentTab === "Home" ? <HomeTab /> : <DiscoverTab />}</View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default Home;
