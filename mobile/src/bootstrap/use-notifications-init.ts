import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

import Logger from '@/lib/logger';
import {
  configureNotificationChannel,
  getPushToken,
  requestNotificationPermission,
} from '@/lib/notifications';

export function useNotificationsInit() {
  useEffect(() => {
    async function initNotifications() {
      try {
        await configureNotificationChannel();

        const granted = await requestNotificationPermission();

        if (!granted) {
          Logger.info({
            message: 'Push notification permission denied.',
          });

          return;
        }

        const token = await getPushToken();

        Logger.debug({
          message: 'Push token generated.',
          data: {
            token,
          },
        });
      } catch (error) {
        Logger.exception({
          message: 'Failed to initialize push notifications.',
          error,
          tags: {
            feature: 'notifications',
            action: 'initialize',
          },
        });
      }
    }

    void initNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((notification) => {
      Logger.debug({
        message: 'Notification response received.',
        data: {
          notification,
        },
      });
    });

    return () => {
      subscription.remove();
    };
  }, []);
}
