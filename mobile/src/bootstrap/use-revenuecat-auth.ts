import { useUser } from '@clerk/expo';
import * as Sentry from '@sentry/react-native';
import { useEffect } from 'react';
import Purchases from 'react-native-purchases';

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
          await Purchases.logOut();

          posthog.capture('revenuecat_logout');

          return;
        }

        userId = user.id;

        const currentUserId = await Purchases.getAppUserID();

        if (currentUserId === userId) {
          return;
        }

        await Purchases.logIn(userId);

        posthog.capture('revenuecat_login', {
          clerkUserId: userId,
        });
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));

        Sentry.captureException(error, {
          tags: {
            context: 'revenuecat_auth_sync',
            clerkUserId: userId,
          },
        });

        posthog.capture('revenuecat_login_failed', {
          clerkUserId: userId ?? null,
          error: error.message,
        });
      }
    }

    void syncRevenueCat();
  }, [isLoaded, isSignedIn, user]);
}
