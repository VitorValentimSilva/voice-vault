import * as Sentry from '@sentry/react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

import {
  configureNotificationChannel,
  getPushToken,
  requestNotificationPermission,
} from '@/lib/notifications';

export function useNotificationsInit() {
  useEffect(() => {
    async function initNotifications() {
      await configureNotificationChannel();

      const granted = await requestNotificationPermission();

      if (!granted) {
        return;
      }

      try {
        const token = await getPushToken();

        if (__DEV__) {
          console.log('[Push] Token:', token);
        }
      } catch (error) {
        if (__DEV__) {
          console.warn('[Push] Failed to get token:', error);
        }

        Sentry.captureException(error, {
          tags: {
            area: 'push-notifications',
          },
        });
      }
    }

    void initNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((notification) => {
      if (__DEV__) {
        console.log('[Notification]', notification);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
}
