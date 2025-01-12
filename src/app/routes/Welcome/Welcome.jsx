import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSelector } from "react-redux";

import { BABYBLUE, MAGENTA, GREY, LIGHTGREY } from "@/constants/colors";
import { useNavigation } from "@react-navigation/native";
import font from "@/constants/fonts";

function Welcome() {
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        position: "relative",
      }}
    >
      <Image
        source={require("../../../assets/images/book.png")}
        style={{
          marginHorizontal: "auto",
          marginTop: 10 * (height / 100),
          width: 30 * (width / 100),
          height: 30 * (width / 100),
        }}
      />

      <Text
        style={{
          color: BABYBLUE,
          fontSize: 10 * (width / 100),
          fontFamily: "RobotoFlex",
          fontWeight: 600,
          marginBottom: 0,
        }}
      >
        Welcome to
      </Text>

      <Text
        style={{
          fontSize: 11 * (width / 100),
          lineHeight: 14 * (width / 100),
          fontFamily: font("Jost", "SemiBold"),
          marginTop: 0,
        }}
      >
        Bolti Kitabain
      </Text>
      <Text>Listen to the voices of Pakistan</Text>
      <View
        style={{ marginTop: 5 * (height / 100), width: 50 * (width / 100) }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: 8 * (height / 100),
            backgroundColor: GREY,
            borderRadius: 3 * (width / 100),
          }}
          onPress={() =>
            navigation.navigate("BasicInfo", { navigateTo: "InterestedGenres" })
          }
        >
          <Text
            style={{
              color: "white",
              fontSize: 5 * (width / 100),
              fontFamily: font("Jost", "Medium"),
              textAlign: "center",
              marginVertical: "auto",
            }}
          >
            Continue as guest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 2 * (height / 100),
            width: "100%",
            height: 8 * (height / 100),
            backgroundColor: BABYBLUE,
            borderRadius: 3 * (width / 100),
          }}
          onPress={() =>
            navigation.navigate("BasicInfo", { navigateTo: "CreateAccount" })
          }
        >
          <Text
            style={{
              color: "white",
              fontSize: 5 * (width / 100),
              fontFamily: font("Jost", "Medium"),
              textAlign: "center",
              marginVertical: "auto",
            }}
          >
            Create an account
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 1.75 * (height / 100),
            fontSize: 15,
            width: 47.5 * (width / 100),
            marginHorizontal: "auto",
            textAlign: "center",
            textDecorationLine: "underline",
          }}
        >
          Already have an account? Sign in
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 5 * (height / 100),
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text style={{ color: GREY, marginVertical: "auto", marginRight: 10 }}>
          A project of
        </Text>
        <Image
          source={require("../../../assets/images/pitb.png")}
          style={{ width: 10 * (width / 100), height: 10 * (width / 100) }}
        />
      </View>
    </View>
  );
}

export default Welcome;
