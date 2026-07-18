import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    extra: {
      ...config.extra,
      POSTHOG_PROJECT_TOKEN: process.env.POSTHOG_PROJECT_TOKEN,
      POSTHOG_HOST: process.env.POSTHOG_HOST,
      appEnv: process.env.APP_ENV ?? 'development',
      EXPO_PUBLIC_CLERK_GOOGLE_WEB_CLIENT_ID: process.env.EXPO_PUBLIC_CLERK_GOOGLE_WEB_CLIENT_ID,
      EXPO_PUBLIC_CLERK_GOOGLE_IOS_CLIENT_ID: process.env.EXPO_PUBLIC_CLERK_GOOGLE_IOS_CLIENT_ID,
      EXPO_PUBLIC_CLERK_GOOGLE_ANDROID_CLIENT_ID:
        process.env.EXPO_PUBLIC_CLERK_GOOGLE_ANDROID_CLIENT_ID,
      EXPO_PUBLIC_CLERK_GOOGLE_IOS_URL_SCHEME: process.env.EXPO_PUBLIC_CLERK_GOOGLE_IOS_URL_SCHEME,
      eas: {
        projectId: 'fd37b3d6-2cd9-47b0-81da-4567dfa910c5',
      },
    },
  } as ExpoConfig;
};
