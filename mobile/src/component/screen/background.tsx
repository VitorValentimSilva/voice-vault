import { LinearGradient } from 'expo-linear-gradient';
import { SplashScreen } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ParticleGroup from '@/component/screen/particle-group';
import { GradientKey, THEME } from '@/const/theme.const';

type BackgroundProps = {
  children: ReactNode;
  haveParticles?: boolean;
  haveGlow?: boolean;
  glowColor?: string;
  backgroundType?: 'gradient' | 'solid';
  gradient?: GradientKey;
  backgroundColor?: string;
};

export function Background({
  children,
  haveParticles = false,
  haveGlow = false,
  glowColor,
  backgroundType = 'gradient',
  gradient = 'screenBackground',
  backgroundColor,
}: BackgroundProps) {
  const { colorScheme } = useColorScheme();

  const activeScheme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = THEME[activeScheme];

  const insets = useSafeAreaInsets();

  const screenOpacity = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  const glowScale = useSharedValue(1);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});

    glowOpacity.value = withDelay(
      200,
      withRepeat(
        withSequence(withTiming(0.12, { duration: 1800 }), withTiming(0.07, { duration: 1800 })),
        -1,
        true
      )
    );

    glowScale.value = withDelay(
      200,
      withRepeat(
        withSequence(withTiming(1.1, { duration: 1800 }), withTiming(0.95, { duration: 1800 })),
        -1,
        true
      )
    );
  }, [glowOpacity, glowScale]);

  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    width: 255,
    height: 255,
    opacity: glowOpacity.value,
    transform: [{ translateY: -133 }, { scale: glowScale.value }],
  }));

  const contentStyle = {
    paddingTop: insets.top + 24,
    paddingBottom: insets.bottom + 24,
  };

  const overlay = (
    <>
      {(haveGlow || haveParticles) && (
        <Animated.View
          accessibilityElementsHidden
          className="absolute inset-0"
          importantForAccessibility="no-hide-descendants"
          pointerEvents="none">
          {haveGlow && (
            <Animated.View
              className="absolute top-1/2 self-center rounded-full"
              style={[
                glowStyle,
                {
                  backgroundColor: glowColor ?? currentTheme.foreground,
                },
              ]}
            />
          )}

          {haveParticles && <ParticleGroup />}
        </Animated.View>
      )}

      {children}
    </>
  );

  return (
    <Animated.View className="flex-1" style={screenStyle}>
      {backgroundType === 'gradient' ? (
        <LinearGradient
          className="flex-1 px-6"
          colors={currentTheme.gradients[gradient]}
          end={{ x: 0.9, y: 1 }}
          start={{ x: 0.1, y: 0 }}
          style={contentStyle}>
          {overlay}
        </LinearGradient>
      ) : (
        <View
          className="flex-1 px-6"
          style={{
            ...contentStyle,
            backgroundColor: backgroundColor ?? currentTheme.background,
          }}>
          {overlay}
        </View>
      )}
    </Animated.View>
  );
}
