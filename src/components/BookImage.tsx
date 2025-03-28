import {
  Image,
  StyleProp,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { endpoints } from "@/constants/endpoints";
import { GREY } from "@/constants/colors";
import { getImageURL } from "@/helpers/books";

export default function BookImage({
  id,
  width,
  height,
  containerStyle,
}: {
  id?: string;
  width?: number;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
}) {
  const swidth = useWindowDimensions().width;
  const ratio = 3 / 4;

  if (!width && !height) {
    return <></>;
  }

  if (!width) {
    // @ts-ignore
    width = height * ratio;
  }
  if (!height) {
    height = width / ratio;
  }

  return (
    <View
      style={{
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
        //@ts-ignore
        ...containerStyle,
      }}
    >
      {id && (
        <Image
          source={{
            uri: getImageURL(id),
          }}
          style={{
            width: width,
            height: height,
            borderRadius: 3 * (swidth / 100),
            overflow: "hidden",
            borderWidth: 2,
          }}
        />
      )}
    </View>
  );
}
