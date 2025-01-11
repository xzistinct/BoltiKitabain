import {StyleProp, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export default function AngleRight({
  color,
  style,
}: {
  color: string;

  style: StyleProp<ViewStyle>;
}) {
  return (
    <Svg viewBox="0 0 194.05 354.15" style={style}>
      <Path
        fill={color}
        d="M17.02,354.15c-4.55,0-8.83-1.77-12.04-4.98-6.64-6.64-6.64-17.45,0-24.09l148-148L5.08,29.07c-6.64-6.65-6.64-17.45,0-24.09C8.29,1.77,12.57,0,17.12,0s8.83,1.77,12.04,4.98l149.36,149.36-.1.1,10.64,10.64c6.64,6.64,6.64,17.45,0,24.09L29.07,349.17c-3.21,3.21-7.49,4.98-12.04,4.98Z"
      />
    </Svg>
  );
}
