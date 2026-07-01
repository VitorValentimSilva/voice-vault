import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    extra: {
      ...config.extra,
      posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
      posthogHost: process.env.POSTHOG_HOST,
      appEnv: process.env.APP_ENV ?? 'development',
      eas: {
        projectId: 'fd37b3d6-2cd9-47b0-81da-4567dfa910c5',
      },
    },
  } as ExpoConfig;
};
