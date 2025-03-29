import { DARKGREY, GREY } from "@/constants/colors";
import font from "@/constants/fonts";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { BarIndicator } from "react-native-indicators";

export default function Search({ route }: any) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState<string>(
    route.params.searchQuery || ""
  );
  const [searchResults, setSearchResults] = useState<Array<any>>([]);

  const [screenState, setScreenState] = useState<
    "loading" | "error" | "success"
  >("loading");

  const loadSearchResults = async () => {};

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        width: width,
        height: height,
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            display: "flex",
            marginTop: 7.5 * (height / 100),
            flexDirection: "row",
            width: 90 * (width / 100),
            marginHorizontal: "auto",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo
              name="chevron-small-left"
              size={width * 0.15}
              color="black"
            />
          </TouchableOpacity>
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
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            placeholder="Search the catalogue"
            placeholderTextColor={GREY}
          />
        </View>
        <View style={{ flex: 1, backgroundColor: "red" }}>
          {screenState === "loading" && <BarIndicator />}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
