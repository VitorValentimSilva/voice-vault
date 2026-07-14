import { useAuth } from '@clerk/expo';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, { FadeInUp, useReducedMotion } from 'react-native-reanimated';

import { Icon } from '@/component/common/icon';
import WaveBarGroup from '@/component/common/wave-bar-group';
import { Background } from '@/component/screen/background';
import { Text } from '@/component/ui/text';
import { THEME } from '@/const/theme.const';

const MIN_HOLD_MS = 1200;

export default function SplashScreen() {
  const { t } = useTranslation(['screen']);
  const { colorScheme } = useColorScheme();
  const { isLoaded, isSignedIn } = useAuth();

  const [minHoldElapsed, setMinHoldElapsed] = useState(false);

  const activeScheme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = THEME[activeScheme];

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timeout = setTimeout(() => setMinHoldElapsed(true), MIN_HOLD_MS);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isLoaded || !minHoldElapsed) {
      return;
    }

    router.replace(isSignedIn ? '/(protected)/(tabs)/home' : '/(auth)/sign-in');
  }, [isLoaded, minHoldElapsed, isSignedIn]);

  const animatedProps = !reduceMotion ? { entering: FadeInUp.duration(500).delay(380) } : {};

  return (
    <Background haveGlow haveParticles glowColor={currentTheme.mutedForeground} gradient="surface">
      <View className="flex-1 items-center justify-center">
        <Icon decorative size={110} />

        <WaveBarGroup />

        <Animated.View {...animatedProps} className="items-center">
          <Text className="text-center" variant="h4">
            {t('splash.title')}
          </Text>

          <Text className="max-w-xs text-center" variant="muted">
            {t('splash.description')}
          </Text>
        </Animated.View>
      </View>
    </Background>
  );
}
