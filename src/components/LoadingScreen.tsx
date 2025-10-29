import { View, Text, useWindowDimensions } from "react-native";

import { BarIndicator as ActivityIndicator } from "react-native-indicators";
import font from "@/constants/fonts";

export default function LoadingScreen({ content }: { content: string }) {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View style={{ height: height * 0.1 }}>
        <ActivityIndicator color="#000" count={5} />
      </View>
      <Text style={{ fontFamily: font("OpenSans", "Medium"), fontSize: 15 }}>
        {content}
      </Text>
    </View>
  );
}
