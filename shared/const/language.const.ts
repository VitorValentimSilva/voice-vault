export const SUPPORTED_LANGUAGES = ['en-US', 'pt-BR'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export type LanguagePreference = SupportedLanguage | 'system';

export const DEFAULT_LANGUAGE_PREFERENCE: LanguagePreference = 'system';
