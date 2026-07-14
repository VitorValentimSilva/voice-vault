import { StartSSOFlowParams, useSSO } from '@clerk/expo';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Image, ImageSourcePropType, Platform, View } from 'react-native';

import { Button } from '@/component/ui/button';
import { cn } from '@/lib/utils';

WebBrowser.maybeCompleteAuthSession();

type SocialConnectionStrategy = Extract<
  StartSSOFlowParams['strategy'],
  'oauth_google' | 'oauth_github' | 'oauth_apple'
>;

const SOCIAL_CONNECTION_STRATEGIES: {
  type: SocialConnectionStrategy;
  source: ImageSourcePropType;
  useTint?: boolean;
}[] = [
  {
    type: 'oauth_apple',
    source: { uri: 'https://img.clerk.com/static/apple.png?width=160' },
    useTint: true,
  },
  {
    type: 'oauth_google',
    source: { uri: 'https://img.clerk.com/static/google.png?width=160' },
    useTint: false,
  },
  {
    type: 'oauth_github',
    source: { uri: 'https://img.clerk.com/static/github.png?width=160' },
    useTint: true,
  },
];

export function SocialConnections() {
  useWarmUpBrowser();
  const { colorScheme } = useColorScheme();
  const { startSSOFlow } = useSSO();

  function onSocialLoginPress(strategy: SocialConnectionStrategy) {
    return () => {
      void (async () => {
        try {
          const { createdSessionId, setActive } = await startSSOFlow({
            strategy,
            redirectUrl: AuthSession.makeRedirectUri({
              scheme: 'voice-vault',
            }),
          });

          if (createdSessionId && setActive) {
            await setActive({ session: createdSessionId });

            return;
          }
        } catch (err) {
          console.error(JSON.stringify(err, null, 2));
        }
      })();
    };
  }

  return (
    <View className="gap-2 sm:flex-row sm:gap-3">
      {SOCIAL_CONNECTION_STRATEGIES.map((strategy) => {
        return (
          <Button
            key={strategy.type}
            className="sm:flex-1"
            size="sm"
            variant="outline"
            onPress={onSocialLoginPress(strategy.type)}>
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

function useWarmUpBrowser() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }

    let mounted = true;

    const warmUp = async () => {
      if (mounted) {
        await WebBrowser.warmUpAsync();
      }
    };

    void warmUp();

    return () => {
      mounted = false;

      void WebBrowser.coolDownAsync();
    };
  }, []);
}
