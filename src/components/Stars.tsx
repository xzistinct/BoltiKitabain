import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Stars({
  stars,
  size,
}: {
  stars: number;
  size: number;
}) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(Math.floor(stars))].map((_, index) => (
        <FontAwesome name="star" size={size} color="gold" key={index} />
      ))}
      {stars % 1 !== 0 && (
        <FontAwesome name="star-half" size={size} color="gold" />
      )}
    </View>
  );
}
