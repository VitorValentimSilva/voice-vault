import { StartSSOFlowParams, useSSO } from '@clerk/expo';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { ImageSourcePropType, Platform } from 'react-native';

import Logger from '@/lib/logger';
import { posthog } from '@/lib/posthog';

WebBrowser.maybeCompleteAuthSession();

export type SocialConnectionStrategy = Extract<
  StartSSOFlowParams['strategy'],
  'oauth_google' | 'oauth_github' | 'oauth_apple'
>;

export const SOCIAL_CONNECTION_STRATEGIES: {
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

export function useWarmUpBrowser() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }

    let mounted = true;

    const warmUp = async () => {
      try {
        if (mounted) {
          await WebBrowser.warmUpAsync();

          Logger.debug({
            message: 'OAuth browser warmed up.',
          });
        }
      } catch (error) {
        Logger.exception({
          message: 'Failed to warm up OAuth browser.',
          error,
          tags: {
            feature: 'authentication',
            action: 'browser_warmup',
          },
        });
      }
    };

    void warmUp();

    return () => {
      mounted = false;

      void WebBrowser.coolDownAsync();
    };
  }, []);
}

export function onSocialLoginPress(
  strategy: SocialConnectionStrategy,
  startSSOFlow: ReturnType<typeof useSSO>['startSSOFlow']
) {
  return () => {
    void (async () => {
      posthog.capture('social_login_clicked', {
        strategy,
      });

      Logger.debug({
        message: 'Social login started.',
        data: {
          strategy,
        },
      });

      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy,
          redirectUrl: AuthSession.makeRedirectUri({
            scheme: 'voice-vault',
          }),
        });

        if (!createdSessionId || !setActive) {
          Logger.warn({
            message: 'Social login completed without active session.',
            data: {
              strategy,
            },
          });

          return;
        }

        await setActive({
          session: createdSessionId,
        });

        Logger.info({
          message: 'Social login successful.',
          data: {
            strategy,
          },
        });

        posthog.capture('social_login_success', {
          strategy,
        });
      } catch (error) {
        Logger.exception({
          message: 'Social login failed.',
          error,
          tags: {
            feature: 'authentication',
            action: 'social_login',
            strategy,
          },
        });

        posthog.capture('social_login_failed', {
          strategy,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    })();
  };
}
