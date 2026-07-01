import { Appearance } from 'react-native';

import { ThemePreference } from '@/const/theme.const';

export function resolveEffectiveTheme(
  preference: ThemePreference | undefined
): Exclude<ThemePreference, 'system'> {
  if (!preference || preference === 'system') {
    return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
  }

  return preference;
}
