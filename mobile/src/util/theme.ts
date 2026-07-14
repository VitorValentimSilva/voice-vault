import { DarkTheme, DefaultTheme } from 'expo-router/react-navigation';
import { Appearance } from 'react-native';

import { THEME, ThemePreference } from '@/const/theme.const';

export function resolveEffectiveTheme(
  preference: ThemePreference | undefined
): Exclude<ThemePreference, 'system'> {
  if (!preference || preference === 'system') {
    return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
  }

  return preference;
}

export const NAV_THEME = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
