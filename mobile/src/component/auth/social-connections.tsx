import { useSSO } from '@clerk/expo';
import { useColorScheme } from 'nativewind';
import { Image, Platform, View } from 'react-native';

import { Button } from '@/component/ui/button';
import { cn } from '@/lib/utils';
import {
  onSocialLoginPress,
  SOCIAL_CONNECTION_STRATEGIES,
  useWarmUpBrowser,
} from '@/util/component/auth/social-connections';

export function SocialConnections() {
  useWarmUpBrowser();

  const { colorScheme } = useColorScheme();
  const { startSSOFlow } = useSSO();

  return (
    <View className="gap-2 sm:flex-row sm:gap-3">
      {SOCIAL_CONNECTION_STRATEGIES.map((strategy) => {
        return (
          <Button
            key={strategy.type}
            className="sm:flex-1"
            size="sm"
            variant="outline"
            onPress={onSocialLoginPress(strategy.type, startSSOFlow)}>
            <Image
              className={cn('size-4', strategy.useTint && Platform.select({ web: 'dark:invert' }))}
              source={strategy.source}
              tintColor={Platform.select({
                native: strategy.useTint ? (colorScheme === 'dark' ? 'white' : 'black') : undefined,
              })}
            />
          </Button>
        );
      })}
    </View>
  );
}
