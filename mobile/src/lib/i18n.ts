import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import {
  DEFAULT_LANGUAGE_PREFERENCE,
  FALLBACK_LANGUAGE,
  type LanguagePreference,
} from '@/const/language.const';
import { DEFAULT_NAMESPACE, RESOURCES } from '@/locale';
import { resolveEffectiveLanguage } from '@/util/language';
import { getPersistedPreferences } from '@/util/storage';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NAMESPACE;
    resources: (typeof RESOURCES)['en-US'];
  }
}

const initialPreferences = getPersistedPreferences();
const initialLanguage = resolveEffectiveLanguage(
  initialPreferences.languagePreference ?? DEFAULT_LANGUAGE_PREFERENCE
);

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: RESOURCES,
  lng: initialLanguage,
  fallbackLng: FALLBACK_LANGUAGE,
  defaultNS: DEFAULT_NAMESPACE,
  ns: [DEFAULT_NAMESPACE],
  interpolation: {
    escapeValue: false,
  },
  debug: __DEV__,
});

export async function applyLanguagePreference(preference: LanguagePreference): Promise<void> {
  const nextLanguage = resolveEffectiveLanguage(preference);

  if (i18n.language !== nextLanguage) {
    await i18n.changeLanguage(nextLanguage);
  }
}

export default i18n;
