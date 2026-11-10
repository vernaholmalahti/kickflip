import { Path } from 'react-native-svg';

import { Icon, type IconProps } from './Icon';

/** Book with a star on the cover. Trick Book tab. */
export function TrickBookIcon(props: IconProps) {
  return (
    <Icon {...props}>
      {/* cover and spine */}
      <Path d="M5 19V5a2 2 0 0 1 2-2h12v15H7a2 2 0 0 0-2 2 1 1 0 0 0 1 1h13" />
      {/* small four-point star */}
      <Path d="M13 5.5l1.2 2.8 2.8 1.2-2.8 1.2-1.2 2.8-1.2-2.8-2.8-1.2 2.8-1.2z" />
    </Icon>
  );
}
