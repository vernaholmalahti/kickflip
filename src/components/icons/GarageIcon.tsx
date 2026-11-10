import { Path } from 'react-native-svg';

import { Icon, type IconProps } from './Icon';

/** Garage building with a roll-up door. Garage tab. */
export function GarageIcon(props: IconProps) {
  return (
    <Icon {...props}>
      {/* building outline with a pitched roof */}
      <Path d="M3 20V9.5L12 4l9 5.5V20" />
      {/* roll-up door and its slats */}
      <Path d="M7 20v-8h10v8" />
      <Path d="M7 15h10" />
      <Path d="M7 18h10" />
    </Icon>
  );
}
