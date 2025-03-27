import {
  Image,
  StyleProp,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { endpoints } from "@/helpers/endpoints";
import { GREY } from "@/constants/colors";
import { getImageURL } from "@/helpers/books";

export default function BookImage({
  id,
  width,
  height,
  containerStyle,
}: {
  id: string;
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
        backgroundColor: GREY,
        //@ts-ignore
        ...containerStyle,
      }}
    >
      <Image
        source={{
          uri: getImageURL(id),
        }}
        style={{
          width: width,
          height: height,
        }}
      />
    </View>
  );
}
