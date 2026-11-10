import { Circle, Path } from 'react-native-svg';

import { Icon, type IconProps } from './Icon';

/** Side view of a skateboard: deck with kicked-up nose and tail, two wheels. Today tab. */
export function SkateboardIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Path d="M2 10.5c.8 1.5 1.8 2.5 3.5 2.5h13c1.7 0 2.7-1 3.5-2.5" />
      <Circle cx={7.5} cy={17} r={2} />
      <Circle cx={16.5} cy={17} r={2} />
    </Icon>
  );
}
