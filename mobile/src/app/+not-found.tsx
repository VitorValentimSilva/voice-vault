import { router } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Icon } from '@/component/common/icon';
import { Background } from '@/component/screen/background';
import { Button } from '@/component/ui/button';
import { Text } from '@/component/ui/text';

export default function NotFoundScreen() {
  const { t } = useTranslation(['screen', 'button']);

  const reduceMotion = useReducedMotion();
  const breathingScale = useSharedValue(1);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    breathingScale.value = withRepeat(
      withSequence(withTiming(1.025, { duration: 900 }), withTiming(1, { duration: 900 })),
      -1,
      true
    );
  }, [breathingScale, reduceMotion]);

  const breathingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breathingScale.value }],
  }));

  const contentEntering = !reduceMotion ? FadeInUp.duration(500).delay(380) : undefined;
  const buttonsEntering = !reduceMotion ? FadeInUp.duration(500).delay(480) : undefined;

  return (
    <Background
      haveParticles
      backgroundType="gradient"
      gradient="screenBackground"
      haveGlow={false}>
      <View className="flex-1 items-center justify-center gap-3">
        <Icon decorative size={110} />

        <Animated.Text
          accessibilityElementsHidden
          className="text-6xl font-bold leading-none tracking-tighter text-primary"
          importantForAccessibility="no-hide-descendants"
          style={reduceMotion ? undefined : breathingStyle}>
          404
        </Animated.Text>

        <Animated.View
          {...(contentEntering ? { entering: contentEntering } : {})}
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
          className="items-center">
          <Text className="text-center" variant="h4">
            {t('screen:errorBoundary.title')}
          </Text>

          <Text className="max-w-xs text-center" variant="muted">
            {t('screen:notFound.description')}
          </Text>
        </Animated.View>
      </View>

      <Animated.View
        {...(buttonsEntering ? { entering: buttonsEntering } : {})}
        className="w-full gap-4">
        <Button
          accessibilityHint={t('button:backToHomeHint')}
          accessibilityLabel={t('button:backToHome')}
          accessibilityRole="button"
          size="lg"
          onPress={() => router.replace('/(protected)/(tabs)/home')}>
          <Text>{t('button:backToHome')}</Text>
        </Button>

        <Button
          accessibilityHint={t('button:goBackHint')}
          accessibilityLabel={t('button:back')}
          accessibilityRole="button"
          size="lg"
          variant="secondary"
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/(protected)/(tabs)/home');
            }
          }}>
          <Text>{t('button:back')}</Text>
        </Button>
      </Animated.View>
    </Background>
  );
}
