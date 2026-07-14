import { useColorScheme } from 'nativewind';

import { Particle } from '@/component/screen/particle';
import { THEME } from '@/const/theme.const';

export default function ParticleGroup() {
  const { colorScheme } = useColorScheme();

  const activeScheme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = THEME[activeScheme];

  const p1 = currentTheme.primary;
  const p2 = currentTheme.accent;
  const p3 = currentTheme.primaryForeground;
  const p4 = currentTheme.accentForeground;

  return (
    <>
      <Particle color={p1} delayMs={0} left={14} size={6} top={12} travelY={18} />

      <Particle color={p2} delayMs={300} left={80} size={5} top={18} travelY={15} />

      <Particle color={p3} delayMs={600} left={24} size={4} top={26} travelY={12} />

      <Particle color={p4} delayMs={900} left={88} size={5} top={32} travelY={17} />

      <Particle color={p1} delayMs={400} left={10} size={4} top={44} travelY={11} />

      <Particle color={p2} delayMs={700} left={92} size={5} top={50} travelY={14} />

      <Particle color={p3} delayMs={1000} left={18} size={6} top={58} travelY={16} />

      <Particle color={p4} delayMs={1200} left={78} size={4} top={64} travelY={13} />

      <Particle color={p1} delayMs={200} left={12} size={5} top={72} travelY={18} />

      <Particle color={p2} delayMs={500} left={85} size={4} top={80} travelY={12} />

      <Particle color={p3} delayMs={800} left={35} size={6} top={74} travelY={16} />

      <Particle color={p4} delayMs={1100} left={60} size={5} top={22} travelY={14} />

      <Particle color={p1} delayMs={1400} left={70} size={4} top={40} travelY={12} />

      <Particle color={p2} delayMs={1600} left={55} size={5} top={65} travelY={15} />
    </>
  );
}
