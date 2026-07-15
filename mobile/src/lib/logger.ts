import * as Sentry from '@sentry/react-native';

type LogLevel = 'debug' | 'info' | 'warn';

type LogOptions = {
  message: string;
  data?: unknown;
};

type ExceptionOptions = {
  message: string;
  error: unknown;
  tags?: Record<string, string | number | boolean>;
  extra?: Record<string, unknown>;
};

export default class Logger {
  private static normalizeData(data?: unknown): Record<string, unknown> | undefined {
    if (data == null) {
      return undefined;
    }

    if (typeof data === 'object') {
      return data as Record<string, unknown>;
    }

    return {
      value: data,
    };
  }

  private static sendLogToSentry(level: LogLevel, message: string, data?: Record<string, unknown>) {
    switch (level) {
      case 'debug':
        Sentry.logger.debug(message, data);
        break;

      case 'info':
        Sentry.logger.info(message, data);
        break;

      case 'warn':
        Sentry.logger.warn(message, data);
        break;
    }
  }

  private static log(level: LogLevel, { message, data }: LogOptions) {
    const normalizedData = this.normalizeData(data);

    console[level](message, normalizedData);

    this.sendLogToSentry(level, message, normalizedData);
  }

  static debug(options: LogOptions) {
    if (__DEV__) {
      this.log('debug', options);
    }
  }

  static info(options: LogOptions) {
    this.log('info', options);
  }

  static warn(options: LogOptions) {
    this.log('warn', options);
  }

  static exception({ message, error, tags, extra }: ExceptionOptions) {
    console.error(message, error);

    Sentry.withScope((scope) => {
      scope.setExtra('message', message);

      if (tags) {
        for (const [key, value] of Object.entries(tags)) {
          scope.setTag(key, String(value));
        }
      }

      if (extra) {
        for (const [key, value] of Object.entries(extra)) {
          scope.setExtra(key, value);
        }
      }

      Sentry.captureException(error);
    });
  }
}
