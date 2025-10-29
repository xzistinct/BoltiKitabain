import { useAppSelector } from "@/state/reduxStore";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { BABYBLUE } from "@/constants/colors";
import { translationTable } from "@/constants/translation-table";
import font from "@/constants/fonts";
import { errors } from "@/constants/errors";
import { tError } from "@/constants/types";

export default function ErrorScreen({
  error,
  content,
  onPress,
  buttonContent,
}: {
  error: tError;
  content: string;
  onPress: () => void;
  buttonContent: string;
}) {
  const { width, height } = useWindowDimensions();
  const language = useAppSelector((state) => state.user.userInfo?.language);
  return (
    <View style={{ width: width * 0.8 }}>
      <Text style={{ fontFamily: font("OpenSans", "Medium"), fontSize: 20 }}>
        {content}
      </Text>
      <Text
        style={{
          fontFamily: font("Roboto", "Regular"),
          fontSize: 10,
          marginTop: height * 0.005,
        }}
      >
        {error}
      </Text>
      <View style={{ marginTop: height * 0.05, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: BABYBLUE,
            width: width * 0.4,
            height: height * 0.065,
            borderRadius: 10,
            justifyContent: "center",
          }}
          onPress={onPress}
        >
          <Text
            style={{
              fontFamily: font("OpenSans", "Medium"),
              fontSize: 17,
              color: "white",
              textAlign: "center",
            }}
          >
            {buttonContent}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
