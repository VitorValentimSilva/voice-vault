import { LanguagePreference } from '@/const/language.const';
import { ThemePreference } from '@/const/theme.const';

export const APP_PREFERENCES_STORAGE_KEY = 'voice-vault-preferences';

export type PersistedPreferencesEnvelope = {
  state?: {
    languagePreference?: LanguagePreference;
    themePreference?: ThemePreference;
  };
};

export type AppPreferencesState = {
  languagePreference: LanguagePreference;
  themePreference: ThemePreference;
  setLanguagePreference: (languagePreference: LanguagePreference) => void;
  setThemePreference: (themePreference: ThemePreference) => void;
  resetLanguagePreference: () => void;
  resetThemePreference: () => void;
};
