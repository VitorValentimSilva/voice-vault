import { useUser } from '@clerk/expo';
import { useEffect } from 'react';
import Purchases from 'react-native-purchases';

import Logger from '@/lib/logger';
import { posthog } from '@/lib/posthog';

export function useRevenueCatAuth() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    let userId = user?.id ?? null;

    async function syncRevenueCat() {
      try {
        if (!isSignedIn || !user) {
          const isAnonymous = await Purchases.isAnonymous();

          if (!isAnonymous) {
            await Purchases.logOut();

            Logger.info({
              message: 'RevenueCat user logged out.',
            });

            posthog.capture('revenuecat_logout');
          }
          return;
        }

        userId = user.id;

        const currentUserId = await Purchases.getAppUserID();

        if (currentUserId === userId) {
          Logger.debug({
            message: 'RevenueCat user already synchronized.',
            data: {
              clerkUserId: userId,
            },
          });

          return;
        }

        await Purchases.logIn(userId);

        Logger.info({
          message: 'RevenueCat user synchronized.',
          data: {
            clerkUserId: userId,
          },
        });

        posthog.capture('revenuecat_login', {
          clerkUserId: userId,
        });
      } catch (error) {
        Logger.exception({
          message: 'Failed to synchronize RevenueCat user.',
          error,
          tags: {
            feature: 'revenuecat',
            action: 'user_sync',
          },
          extra: {
            clerkUserId: userId,
          },
        });

        posthog.capture('revenuecat_login_failed', {
          clerkUserId: userId,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    void syncRevenueCat();
  }, [isLoaded, isSignedIn, user]);
}
