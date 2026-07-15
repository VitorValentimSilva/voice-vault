import * as Sentry from '@sentry/react-native';

export const logger = {
  debug(message: string, data?: unknown) {
    if (__DEV__) {
      console.debug(message, data);
    }
  },

  info(message: string, data?: unknown) {
    if (__DEV__) {
      console.info(message, data);
    }
  },

  warn(message: string, data?: unknown) {
    console.warn(message, data);
  },

  error(message: string, error?: unknown) {
    console.error(message, error);

    if (error != null) {
      Sentry.captureException(error);
    }
  },
};
