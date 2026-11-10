import type { ReactNode } from 'react';
import type { ColorValue } from 'react-native';
import Svg from 'react-native-svg';

export interface IconProps {
  color: ColorValue;
  size: number;
}

// All icons are drawn on a 24×24 grid and scaled to `size`.
const VIEWBOX = '0 0 24 24';
const STROKE_WIDTH = 2;

/**
 * Shared wrapper for outline icons: the children only describe shapes; stroke
 * colour, width and rounded ends are set once here and inherited by them.
 *
 * Icons are decorative — the control around them (tab, button) carries the
 * accessibilityLabel — so they are hidden from screen readers.
 */
export function Icon({ color, size, children }: IconProps & { children: ReactNode }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox={VIEWBOX}
      fill="none"
      stroke={color}
      strokeWidth={STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      accessible={false}
      importantForAccessibility="no-hide-descendants"
    >
      {children}
    </Svg>
  );
}
