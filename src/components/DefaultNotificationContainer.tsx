import { useWindowDimensions, View, ViewProps } from "react-native";

export default function DefaultNotificationContainer({
  children,
  containerStyle,
}: {
  children: React.ReactNode;
  containerStyle?: ViewProps;
}) {
  const { width, height } = useWindowDimensions();
  return (
    <View
      style={{
        paddingVertical: 15,
        width: 85 * (width / 100),
        marginHorizontal: "auto",
        marginTop: height - 75,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 10,
        borderRadius: 7.5,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        ...containerStyle,
      }}
    >
      {children}
    </View>
  );
}
