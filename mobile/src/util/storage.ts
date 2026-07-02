import { DEFAULT_LANGUAGE_PREFERENCE, LanguagePreference } from '@/const/language.const';
import { APP_PREFERENCES_STORAGE_KEY, PersistedPreferencesEnvelope } from '@/const/storage.const';
import { DEFAULT_THEME_PREFERENCE, ThemePreference } from '@/const/theme.const';
import { storage } from '@/lib/storage';

export function getPersistedPreferences(): {
  languagePreference: LanguagePreference;
  themePreference: ThemePreference;
} {
  const raw = storage.getString(APP_PREFERENCES_STORAGE_KEY);

  if (!raw) {
    return {
      languagePreference: DEFAULT_LANGUAGE_PREFERENCE,
      themePreference: DEFAULT_THEME_PREFERENCE,
    };
  }

  try {
    const parsed = JSON.parse(raw) as PersistedPreferencesEnvelope;

    return {
      languagePreference: parsed.state?.languagePreference ?? DEFAULT_LANGUAGE_PREFERENCE,
      themePreference: parsed.state?.themePreference ?? DEFAULT_THEME_PREFERENCE,
    };
  } catch {
    return {
      languagePreference: DEFAULT_LANGUAGE_PREFERENCE,
      themePreference: DEFAULT_THEME_PREFERENCE,
    };
  }
}
