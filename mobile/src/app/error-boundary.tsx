import * as Sentry from '@sentry/react-native';
import { ErrorBoundaryProps, router } from 'expo-router';
import { AlertTriangle, ChevronDown, ChevronUp, Home, RotateCcw } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInUp, useReducedMotion } from 'react-native-reanimated';

import { Icon } from '@/component/common/icon';
import { Background } from '@/component/screen/background';
import { Button } from '@/component/ui/button';
import { Text } from '@/component/ui/text';
import { THEME } from '@/const/theme.const';

export default function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const { t } = useTranslation(['screen', 'button', 'error']);
  const { colorScheme } = useColorScheme();

  const [showDetails, setShowDetails] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const activeScheme = colorScheme === 'dark' ? 'dark' : 'light';
  const currentTheme = THEME[activeScheme];

  const reduceMotion = useReducedMotion();
  const reportedErrorRef = useRef<Error | null>(null);

  useEffect(() => {
    if (reportedErrorRef.current === error) {
      return;
    }

    reportedErrorRef.current = error;

    if (__DEV__) {
      console.error('[ErrorBoundary]', error);
    }

    Sentry.captureException(error, {
      tags: { area: 'error-boundary' },
      extra: { retryCount },
    });
  }, [error, retryCount]);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);

    void retry();
  };

  const iconEntering = !reduceMotion ? FadeInUp.duration(500) : null;
  const contentEntering = !reduceMotion ? FadeInUp.duration(500).delay(380) : null;
  const detailsEntering = !reduceMotion ? FadeInUp.duration(500).delay(220) : null;
  const buttonsEntering = !reduceMotion ? FadeInUp.duration(500).delay(320) : null;

  return (
    <Background haveGlow haveParticles glowColor={currentTheme.recordingBg} gradient="surface">
      <View className="flex-1 items-center justify-center gap-3">
        <Animated.View
          {...(iconEntering && { entering: iconEntering })}
          className="items-center justify-center">
          <Icon as={AlertTriangle} color={currentTheme.recording} size={48} strokeWidth={1.75} />
        </Animated.View>

        <Animated.View
          {...(contentEntering && { entering: contentEntering })}
          accessibilityLiveRegion="polite"
          accessibilityRole="alert"
          className="items-center gap-1">
          <Text className="text-center text-recording" variant="h4">
            {t('errorBoundary.title')}
          </Text>

          <Text className="max-w-xs text-center" variant="muted">
            {t('errorBoundary.description')}
          </Text>

          {retryCount >= 2 && (
            <Text className="mt-1 max-w-xs text-center text-xs" variant="muted">
              {t('errorBoundary.persistentErrorHint')}
            </Text>
          )}
        </Animated.View>

        <Animated.View
          {...(detailsEntering && { entering: detailsEntering })}
          className="w-full max-w-sm gap-2">
          <Pressable
            accessibilityHint={t('button:detailsHint')}
            accessibilityLabel={showDetails ? t('button:hideDetails') : t('button:showDetails')}
            accessibilityRole="button"
            accessibilityState={{ expanded: showDetails }}
            className="flex-row items-center justify-center gap-1.5 py-2"
            onPress={() => setShowDetails((prev) => !prev)}>
            <Text className="text-xs font-medium" variant="muted">
              {showDetails ? t('button:hideDetails') : t('button:showDetails')}
            </Text>

            <Icon as={showDetails ? ChevronUp : ChevronDown} color={currentTheme.muted} size={14} />
          </Pressable>

          {showDetails && (
            <ScrollView
              accessibilityLabel={t('error:errorMessage')}
              className="max-h-32 rounded-2xl border border-border bg-card p-2">
              <Text selectable className="text-muted-foreground" variant="code">
                {error?.message ?? t('error:unknownError')}
              </Text>
            </ScrollView>
          )}
        </Animated.View>
      </View>

      <Animated.View
        {...(buttonsEntering && { entering: buttonsEntering })}
        className="w-full gap-4">
        <Button
          accessibilityHint={t('button:retryHint')}
          accessibilityLabel={t('button:retry')}
          size="lg"
          onPress={handleRetry}>
          <Icon as={RotateCcw} color={currentTheme.primaryForeground} size={18} />

          <Text>{t('button:retry')}</Text>
        </Button>

        <Button
          accessibilityHint={t('button:backToHomeHint')}
          accessibilityLabel={t('button:backToHome')}
          size="lg"
          variant="secondary"
          onPress={() => router.replace('/(protected)/(tabs)/home')}>
          <Icon as={Home} color={currentTheme.foreground} size={18} />

          <Text>{t('button:backToHome')}</Text>
        </Button>
      </Animated.View>
    </Background>
  );
}
