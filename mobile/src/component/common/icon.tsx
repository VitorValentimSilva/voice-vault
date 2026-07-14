import { LucideProps } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { ComponentType, useId } from 'react';
import Animated, { FadeIn, useAnimatedStyle } from 'react-native-reanimated';
import Svg, {
  ClipPath,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Polyline,
  Rect,
  Stop,
} from 'react-native-svg';

import { THEME } from '@/const/theme.const';

type IconProps = {
  size?: number;
  decorative?: boolean;
  accessibilityLabel?: string;
  as?: ComponentType<LucideProps>;
  color?: string;
  strokeWidth?: number;
};

export function Icon({
  size = 96,
  decorative = true,
  accessibilityLabel,
  as: LucideIcon,
  color,
  strokeWidth,
}: IconProps) {
  const { colorScheme } = useColorScheme();

  const activeScheme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = THEME[activeScheme];

  const uniqueId = useId();

  const bgGradientId = `${uniqueId}-bg`;
  const waveGradientId = `${uniqueId}-wave`;

  const iconStyle = useAnimatedStyle(() => ({
    shadowColor: currentTheme.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.38,
    shadowRadius: 20,
    elevation: 12,
  }));

  if (LucideIcon) {
    return (
      <LucideIcon
        color={color ?? currentTheme.foreground}
        size={size}
        strokeWidth={strokeWidth ?? 2}
      />
    );
  }

  return (
    <Animated.View
      accessibilityLabel={decorative ? undefined : (accessibilityLabel ?? 'Voice Vault')}
      accessibilityRole={decorative ? undefined : 'image'}
      accessible={!decorative}
      className="mb-5"
      entering={FadeIn.duration(700).delay(100)}
      style={iconStyle}
      {...(decorative
        ? {
            accessibilityElementsHidden: true,
            importantForAccessibility: 'no-hide-descendants' as const,
          }
        : {})}>
      <Svg height={size} viewBox="0 0 120 120" width={size}>
        <Defs>
          <ClipPath id={`${uniqueId}-clip`}>
            <Rect height="120" rx="28" width="120" />
          </ClipPath>

          <LinearGradient id={bgGradientId} x1="0" x2="1" y1="0" y2="1">
            <Stop offset="0%" stopColor={currentTheme.logo.bgStart} />

            <Stop offset="100%" stopColor={currentTheme.logo.bgEnd} />
          </LinearGradient>

          <LinearGradient id={waveGradientId} x1="0" x2="1" y1="0" y2="0">
            <Stop offset="0%" stopColor={currentTheme.logo.waveStart} />

            <Stop offset="100%" stopColor={currentTheme.logo.waveEnd} />
          </LinearGradient>
        </Defs>

        <G clipPath={`url(#${uniqueId}-clip)`}>
          <Rect fill={`url(#${bgGradientId})`} height="120" rx="28" width="120" />

          <Ellipse cx="30" cy="22" fill={currentTheme.logo.ellipseFill} rx="42" ry="30" />

          <Ellipse cx="60" cy="50" fill="rgba(255,255,255,0.04)" rx="34" ry="34" />

          <Rect
            fill={currentTheme.logo.shieldFill}
            height="44"
            rx="18"
            stroke={currentTheme.logo.shieldStroke}
            strokeWidth="2"
            width="36"
            x="42"
            y="24"
          />

          <Polyline
            fill="none"
            points="
              48,47
              53,47
              57,38
              61,56
              65,40
              69,52
              73,47
            "
            stroke={`url(#${waveGradientId})`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.5"
          />

          <Path
            d="M60 68 L60 82"
            stroke={currentTheme.logo.shieldStroke}
            strokeLinecap="round"
            strokeWidth="3"
          />

          <Path
            d="M48 88 H72"
            stroke={currentTheme.logo.shieldStroke}
            strokeLinecap="round"
            strokeWidth="3"
          />

          <Path
            d="M38 62 C38 78 48 86 60 86 C72 86 82 78 82 62"
            fill="none"
            opacity="0.7"
            stroke={currentTheme.logo.shieldStroke}
            strokeWidth="2"
          />
        </G>
      </Svg>
    </Animated.View>
  );
}
