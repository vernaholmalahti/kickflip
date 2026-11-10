import { Circle, Path } from 'react-native-svg';

import { Icon, type IconProps } from './Icon';

/** Head and shoulders of a rider. Me tab. */
export function RiderIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Circle cx={12} cy={8} r={4} />
      <Path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </Icon>
  );
}
