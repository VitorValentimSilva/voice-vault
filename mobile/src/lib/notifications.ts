import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import i18n from '@/lib/i18n';
import Logger from '@/lib/logger';

export async function configureNotificationChannel() {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: i18n.t('notifications.channel.name'),
        importance: Notifications.AndroidImportance.MAX,
      });
    }
  } catch (error) {
    Logger.exception({
      message: 'Failed to configure notification channel.',
      error,
      tags: {
        feature: 'notifications',
        action: 'channel_configuration',
      },
      extra: {
        platform: Platform.OS,
      },
    });
  }
}

export async function requestNotificationPermission() {
  const current = await Notifications.getPermissionsAsync();

  if (current.status === Notifications.PermissionStatus.GRANTED) {
    Logger.debug({
      message: 'Notification permission already granted.',
    });

    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();

  const granted = requested.status === Notifications.PermissionStatus.GRANTED;

  Logger.debug({
    message: 'Notification permission requested.',
    data: {
      granted,
    },
  });

  return granted;
}

export async function getPushToken() {
  try {
    const easConfig = Constants.expoConfig?.extra?.eas as { projectId?: string } | undefined;

    const projectId = easConfig?.projectId;

    if (!projectId) {
      throw new Error(i18n.t('error:codes.LIBS_I18N_EXPO_EAS_PROJECT_ID_MISSING.description'));
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;

    Logger.debug({
      message: 'Expo push token generated.',
      data: {
        hasToken: Boolean(token),
      },
    });

    return token;
  } catch (error) {
    Logger.exception({
      message: 'Failed to generate Expo push token.',
      error,
      tags: {
        feature: 'notifications',
        action: 'push_token',
      },
    });

    throw error;
  }
}
