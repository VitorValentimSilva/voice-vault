import { useEffect } from 'react';
import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

import Logger from '@/lib/logger';

export function useRevenueCatInit() {
  useEffect(() => {
    async function initializeRevenueCat() {
      try {
        const logLevel = __DEV__ ? LOG_LEVEL.VERBOSE : LOG_LEVEL.ERROR;

        await Purchases.setLogLevel(logLevel);

        const apiKey =
          Platform.OS === 'ios'
            ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY
            : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;

        if (!apiKey) {
          Logger.warn({
            message: 'RevenueCat API key is missing.',
            data: {
              platform: Platform.OS,
            },
          });

          return;
        }

        const isConfigured = await Purchases.isConfigured();

        if (isConfigured) {
          Logger.debug({
            message: 'RevenueCat already configured.',
          });

          return;
        }

        Purchases.configure({
          apiKey,
        });

        Logger.info({
          message: 'RevenueCat initialized.',
          data: {
            platform: Platform.OS,
          },
        });
      } catch (error) {
        Logger.exception({
          message: 'Failed to initialize RevenueCat.',
          error,
          tags: {
            feature: 'revenuecat',
            action: 'initialize',
          },
          extra: {
            platform: Platform.OS,
          },
        });
      }
    }

    void initializeRevenueCat();
  }, []);
}
