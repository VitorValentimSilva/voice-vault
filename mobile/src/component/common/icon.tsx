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
        size={size}
        color={color ?? currentTheme.foreground}
        strokeWidth={strokeWidth ?? 2}
      />
    );
  }

  return (
    <Animated.View
      className="mb-5"
      entering={FadeIn.duration(700).delay(100)}
      style={iconStyle}
      accessible={!decorative}
      accessibilityRole={decorative ? undefined : 'image'}
      accessibilityLabel={decorative ? undefined : (accessibilityLabel ?? 'Voice Vault')}
      {...(decorative
        ? {
            accessibilityElementsHidden: true,
            importantForAccessibility: 'no-hide-descendants' as const,
          }
        : {})}>
      <Svg width={size} height={size} viewBox="0 0 120 120">
        <Defs>
          <ClipPath id={`${uniqueId}-clip`}>
            <Rect width="120" height="120" rx="28" />
          </ClipPath>

          <LinearGradient id={bgGradientId} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={currentTheme.logo.bgStart} />

            <Stop offset="100%" stopColor={currentTheme.logo.bgEnd} />
          </LinearGradient>

          <LinearGradient id={waveGradientId} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor={currentTheme.logo.waveStart} />

            <Stop offset="100%" stopColor={currentTheme.logo.waveEnd} />
          </LinearGradient>
        </Defs>

        <G clipPath={`url(#${uniqueId}-clip)`}>
          <Rect width="120" height="120" rx="28" fill={`url(#${bgGradientId})`} />

          <Ellipse cx="30" cy="22" rx="42" ry="30" fill={currentTheme.logo.ellipseFill} />

          <Ellipse cx="60" cy="50" rx="34" ry="34" fill="rgba(255,255,255,0.04)" />

          <Rect
            x="42"
            y="24"
            width="36"
            height="44"
            rx="18"
            fill={currentTheme.logo.shieldFill}
            stroke={currentTheme.logo.shieldStroke}
            strokeWidth="2"
          />

          <Polyline
            points="
              48,47
              53,47
              57,38
              61,56
              65,40
              69,52
              73,47
            "
            fill="none"
            stroke={`url(#${waveGradientId})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <Path
            d="M60 68 L60 82"
            stroke={currentTheme.logo.shieldStroke}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <Path
            d="M48 88 H72"
            stroke={currentTheme.logo.shieldStroke}
            strokeWidth="3"
            strokeLinecap="round"
          />

          <Path
            d="M38 62 C38 78 48 86 60 86 C72 86 82 78 82 62"
            fill="none"
            stroke={currentTheme.logo.shieldStroke}
            strokeWidth="2"
            opacity="0.7"
          />
        </G>
      </Svg>
    </Animated.View>
  );
}
