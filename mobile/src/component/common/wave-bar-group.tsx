import { useColorScheme } from 'nativewind';
import Animated, { FadeIn } from 'react-native-reanimated';

import WaveBar from '@/component/common/wave-bar';
import { THEME } from '@/const/theme.const';

export default function WaveBarGroup() {
  const { colorScheme } = useColorScheme();

  const activeScheme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = THEME[activeScheme];
  const hero = currentTheme.gradients.hero;

  const waves = [
    { colors: [hero[0], hero[1]] as const, delay: 0, peakHeight: 18 },
    { colors: [hero[0], hero[1]] as const, delay: 70, peakHeight: 26 },
    { colors: [hero[1], hero[2]] as const, delay: 140, peakHeight: 34 },
    { colors: [hero[0], hero[2]] as const, delay: 210, peakHeight: 38 },
    { colors: [hero[1], hero[2]] as const, delay: 140, peakHeight: 34 },
    { colors: [hero[0], hero[1]] as const, delay: 70, peakHeight: 26 },
    { colors: [hero[0], hero[1]] as const, delay: 0, peakHeight: 18 },
  ];

  return (
    <Animated.View
      className="mb-5 h-10 flex-row items-end gap-1.5"
      entering={FadeIn.duration(450).delay(280)}>
      {waves.map((wave, i) => (
        <WaveBar key={i} colors={wave.colors} delayMs={wave.delay} peakHeight={wave.peakHeight} />
      ))}
    </Animated.View>
  );
}
