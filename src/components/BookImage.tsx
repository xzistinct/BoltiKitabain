import {
  Image,
  StyleProp,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { endpoints } from "@/helpers/endpoints";
import { GREY } from "@/constants/colors";

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
          uri: endpoints.image + "/" + id,
        }}
        style={{
          width: width,
          height: height,
        }}
      />
    </View>
  );
}
