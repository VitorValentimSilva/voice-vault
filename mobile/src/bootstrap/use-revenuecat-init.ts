import { useEffect } from 'react';
import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

export function useRevenueCatInit() {
  useEffect(() => {
    const initializeRevenueCat = async () => {
      try {
        const logLevel = __DEV__ ? LOG_LEVEL.VERBOSE : LOG_LEVEL.ERROR;

        await Purchases.setLogLevel(logLevel);

        const apiKey =
          Platform.OS === 'ios'
            ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY
            : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;

        if (!apiKey) {
          return;
        }

        const isConfigured = await Purchases.isConfigured();

        if (isConfigured) {
          return;
        }

        Purchases.configure({
          apiKey,
        });
      } catch (error) {
        console.error('Failed to initialize RevenueCat:', error);
      }
    };

    void initializeRevenueCat();
  }, []);
}
