import Constants from 'expo-constants';
import PostHog from 'posthog-react-native';

const apiKey = Constants.expoConfig?.extra?.posthogProjectToken as string | undefined;
const host = Constants.expoConfig?.extra?.posthogHost as string | undefined;

const isConfigured = Boolean(apiKey);

export const posthog = new PostHog(apiKey ?? 'placeholder_key', {
  ...(host ? { host } : {}),
  disabled: !isConfigured,
  captureAppLifecycleEvents: true,
  flushAt: 20,
  flushInterval: 10000,
  maxBatchSize: 100,
  maxQueueSize: 1000,
  preloadFeatureFlags: true,
  fetchRetryCount: 3,
  fetchRetryDelay: 3000,
});

if (__DEV__) {
  posthog.debug(true);
}
