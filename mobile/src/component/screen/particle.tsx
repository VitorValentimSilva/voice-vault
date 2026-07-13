import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

type ParticleProps = {
  color: string;
  size: number;
  top: number;
  left: number;
  delayMs: number;
  travelY: number;
};

export function Particle({ color, size, top, left, delayMs, travelY }: ParticleProps) {
  const y = useSharedValue(0);
  const op = useSharedValue(0);

  useEffect(() => {
    op.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(withTiming(1, { duration: 800 }), withTiming(0.3, { duration: 800 })),
        -1,
        true
      )
    );
    y.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(withTiming(-travelY, { duration: 2400 }), withTiming(0, { duration: 2400 })),
        -1,
        true
      )
    );
  }, [delayMs, op, travelY, y]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: op.value,
    transform: [{ translateY: y.value }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          position: 'absolute',
          top: (top / 100) * SCREEN_H,
          left: (left / 100) * SCREEN_W,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          shadowColor: color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: size * 1.5,
          elevation: 4,
        },
        animStyle,
      ]}
    />
  );
}
