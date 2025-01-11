import { View, useWindowDimensions, Text } from "react-native";

export default function SignIn() {
  const { width, height } = useWindowDimensions();

  return (
    <View>
      <View>
        <Text>Sign In</Text>
      </View>
    </View>
  );
}
