import { View } from 'react-native';

import { Background } from '@/component/screen/background';

export default function HomeScreen() {
  return (
    <Background haveGlow haveParticles glowColor="#fff" gradient="surface">
      <View className="flex-1 items-center justify-center gap-3"></View>
    </Background>
  );
}
