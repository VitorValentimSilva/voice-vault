import { getLocales } from 'expo-localization';

import {
  FALLBACK_LANGUAGE,
  type LanguagePreference,
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
} from '@/const/language.const';

function isSupportedLanguage(language: string): language is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(language as SupportedLanguage);
}

export function resolveDeviceLanguage(): SupportedLanguage {
  const locale = getLocales()[0];

  if (!locale?.languageCode) {
    return FALLBACK_LANGUAGE;
  }

  if (locale.regionCode) {
    const fullTag = `${locale.languageCode}-${locale.regionCode}`;

    if (isSupportedLanguage(fullTag)) {
      return fullTag;
    }
  }

  const languageFallback = SUPPORTED_LANGUAGES.find((language) =>
    language.startsWith(`${locale.languageCode}-`)
  );

  if (languageFallback) {
    return languageFallback;
  }

  return FALLBACK_LANGUAGE;
}

export function resolveEffectiveLanguage(
  preference: LanguagePreference | undefined
): SupportedLanguage {
  if (!preference || preference === 'system') {
    return resolveDeviceLanguage();
  }

  return preference;
}
