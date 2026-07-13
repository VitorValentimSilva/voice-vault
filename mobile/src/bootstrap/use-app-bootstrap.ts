import { useAuth } from '@clerk/expo';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';

import { applyLanguagePreference } from '@/lib/i18n';
import { useAppPreferencesStore } from '@/storage/use-app-preferences-store';

export function useAppBootstrap() {
  const colorScheme = useColorScheme();
  const { isLoaded: isAuthLoaded } = useAuth();

  const [preferencesReady, setPreferencesReady] = useState(false);

  const languagePreference = useAppPreferencesStore((state) => state.languagePreference);
  const themePreference = useAppPreferencesStore((state) => state.themePreference);

  useEffect(() => {
    async function bootstrap() {
      try {
        await applyLanguagePreference(languagePreference);

        colorScheme.setColorScheme(themePreference);
      } finally {
        setPreferencesReady(true);
      }
    }

    void bootstrap();
  }, [languagePreference, themePreference, colorScheme]);

  return preferencesReady && isAuthLoaded;
}
