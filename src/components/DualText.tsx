import { Text, StyleProp, TextStyle } from "react-native";

export default function DualText({
  originalContent,
  dualContent,
  dualStyle,
  style,
}: {
  originalContent: string;
  dualContent: string | null;
  dualStyle: StyleProp<TextStyle>;
  style: StyleProp<TextStyle>;
}) {
  return (
    //@ts-ignore
    <Text style={dualContent ? { ...style, ...dualStyle } : style}>
      {dualContent || originalContent}
    </Text>
  );
}
