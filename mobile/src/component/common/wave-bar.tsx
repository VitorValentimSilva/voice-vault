import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type WaveBarProps = {
  colors: readonly [string, string];
  delayMs: number;
  peakHeight?: number;
};

export default function WaveBar({ colors, delayMs, peakHeight = 34 }: WaveBarProps) {
  const height = useSharedValue(8);
  const opacity = useSharedValue(0.8);

  useEffect(() => {
    height.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(peakHeight, { duration: 760, easing: Easing.inOut(Easing.cubic) }),
          withTiming(8, { duration: 760, easing: Easing.inOut(Easing.cubic) })
        ),
        -1,
        true
      )
    );

    opacity.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 760, easing: Easing.inOut(Easing.cubic) }),
          withTiming(0.72, { duration: 760, easing: Easing.inOut(Easing.cubic) })
        ),
        -1,
        true
      )
    );
  }, [delayMs, peakHeight, height, opacity]);

  const barStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        barStyle,
        {
          width: 6,
          borderRadius: 999,
          shadowColor: colors[1],
          shadowOpacity: 0.22,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 4,
        },
      ]}>
      <LinearGradient
        className="h-full w-full rounded-full"
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </Animated.View>
  );
}
