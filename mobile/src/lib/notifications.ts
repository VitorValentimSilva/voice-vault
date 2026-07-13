import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import i18n from '@/lib/i18n';

export async function configureNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: i18n.t('notifications.channel.name'),
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}

export async function requestNotificationPermission() {
  const current = await Notifications.getPermissionsAsync();

  if (current.status === Notifications.PermissionStatus.GRANTED) {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync();

  return requested.status === Notifications.PermissionStatus.GRANTED;
}

export async function getPushToken() {
  const easConfig = Constants.expoConfig?.extra?.eas as { projectId?: string } | undefined;
  const projectId = easConfig?.projectId;

  if (!projectId) {
    throw new Error(i18n.t('error:codes.LIBS_I18N_EXPO_EAS_PROJECT_ID_MISSING.description'));
  }

  const token = (await Notifications.getExpoPushTokenAsync({ projectId })) as { data: string };

  return token.data;
}
