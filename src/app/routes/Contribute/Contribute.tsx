import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions, View } from "react-native";

export default function Contribute() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  return <View></View>;
}
